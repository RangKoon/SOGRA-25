# GPS & 지도 API 연동 가이드

## 🗺️ Kakao Maps API 연동 (권장)

### 1. API 키 발급

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 애플리케이션 등록
3. JavaScript 키 발급
4. 플랫폼 설정 > Web 플랫폼 추가 > 도메인 등록

### 2. 패키지 설치

```bash
npm install react-kakao-maps-sdk
```

### 3. 환경 변수 설정

**.env**
```
VITE_KAKAO_MAP_API_KEY=your_javascript_key_here
```

### 4. index.html 수정

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>대충여지도</title>
    <!-- Kakao Maps SDK -->
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_KAKAO_MAP_API_KEY%&libraries=services,clusterer,drawing"
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5. GPS 위치 확인 컴포넌트 생성

**src/components/LocationMap.jsx**
```javascript
import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function LocationMap({ qrLocation, onLocationVerified }) {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GPS 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('GPS를 지원하지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true, // 높은 정확도
      timeout: 10000, // 10초 타임아웃
      maximumAge: 0 // 캐시 사용 안 함
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // 정확도 검증 (GPS Spoofing 방지 1단계)
        if (accuracy > 100) {
          setError(`GPS 정확도가 낮습니다 (${Math.round(accuracy)}m). 실외에서 다시 시도해주세요.`);
          setLoading(false);
          return;
        }

        const userPos = { lat: latitude, lng: longitude };
        setUserLocation(userPos);

        // QR 코드 위치와의 거리 계산
        if (qrLocation) {
          const dist = calculateDistance(userPos, qrLocation);
          setDistance(dist);

          // 100m 이내인지 확인
          if (dist <= 100) {
            onLocationVerified?.(true, dist);
          } else {
            onLocationVerified?.(false, dist);
          }
        }

        setLoading(false);
      },
      (err) => {
        console.error('GPS 오류:', err);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('위치 정보를 사용할 수 없습니다.');
            break;
          case err.TIMEOUT:
            setError('위치 요청 시간이 초과되었습니다.');
            break;
          default:
            setError('알 수 없는 오류가 발생했습니다.');
        }
        setLoading(false);
      },
      options
    );
  }, [qrLocation, onLocationVerified]);

  // 두 지점 간 거리 계산 (Haversine formula)
  const calculateDistance = (pos1, pos2) => {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (pos1.lat * Math.PI) / 180;
    const φ2 = (pos2.lat * Math.PI) / 180;
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>현재 위치를 확인하는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  // 지도 중심점 (사용자 위치와 QR 위치의 중간)
  const center = userLocation && qrLocation
    ? {
        lat: (userLocation.lat + qrLocation.lat) / 2,
        lng: (userLocation.lng + qrLocation.lng) / 2
      }
    : userLocation || qrLocation;

  return (
    <div>
      {distance !== null && (
        <div style={{
          padding: '15px',
          marginBottom: '10px',
          backgroundColor: distance <= 100 ? '#d4edda' : '#f8d7da',
          color: distance <= 100 ? '#155724' : '#721c24',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <strong>목적지까지 거리: {Math.round(distance)}m</strong>
          <br />
          {distance <= 100
            ? '✅ QR 스캔 가능한 범위입니다'
            : '❌ 목적지에 더 가까이 이동해주세요 (100m 이내)'}
        </div>
      )}

      <Map
        center={center}
        style={{ width: '100%', height: '400px', borderRadius: '12px' }}
        level={3}
      >
        {/* 사용자 현재 위치 마커 */}
        {userLocation && (
          <MapMarker
            position={userLocation}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
              size: { width: 64, height: 69 },
              options: { offset: { x: 27, y: 69 } }
            }}
          >
            <div style={{ padding: '5px', color: '#000' }}>현재 위치</div>
          </MapMarker>
        )}

        {/* QR 코드 위치 마커 */}
        {qrLocation && (
          <MapMarker
            position={qrLocation}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png',
              size: { width: 64, height: 69 },
              options: { offset: { x: 27, y: 69 } }
            }}
          >
            <div style={{ padding: '5px', color: '#000' }}>QR 코드 위치</div>
          </MapMarker>
        )}
      </Map>
    </div>
  );
}

export default LocationMap;
```

### 6. QR 스캔 페이지에 통합

**Theme3QRScanPage.jsx 수정 예시**
```javascript
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import LocationMap from '../../components/LocationMap';
import './Theme3QRScanPage.css';

function Theme3QRScanPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [distance, setDistance] = useState(null);
  const scannerRef = useRef(null);

  // 이 QR 코드의 실제 위치 (예: 독립기념관)
  const qrLocation = {
    lat: 36.7769, // 위도
    lng: 127.2896 // 경도
  };

  const handleLocationVerified = (verified, dist) => {
    setLocationVerified(verified);
    setDistance(dist);
  };

  const handleStartScan = () => {
    if (!locationVerified) {
      alert('QR 코드 위치에 더 가까이 이동해주세요 (100m 이내)');
      return;
    }

    setScanning(true);
    // ... 기존 QR 스캔 로직
  };

  return (
    <div className="qr-scan-container">
      {/* 뒤로가기 버튼 */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>

      <div className="qr-scan-wrapper">
        {!scanning ? (
          <>
            {/* 지도 표시 */}
            <LocationMap
              qrLocation={qrLocation}
              onLocationVerified={handleLocationVerified}
            />

            {/* QR 코드 이미지 */}
            <div className="qr-image-section">
              <img
                src="/src/images/theme3_ep1_QR.png"
                alt="QR 코드"
                className="qr-code-image"
              />
            </div>

            {/* QR 스캔 버튼 - 위치 확인 후에만 활성화 */}
            <button
              className="qr-scan-button"
              onClick={handleStartScan}
              disabled={!locationVerified}
              style={{
                opacity: locationVerified ? 1 : 0.5,
                cursor: locationVerified ? 'pointer' : 'not-allowed'
              }}
            >
              {locationVerified ? 'QR 스캔하기' : '목적지에 도착 후 스캔 가능'}
            </button>

            {/* 테스트용 우회 버튼 */}
            <button
              className="skip-qr-button"
              onClick={() => navigate('/theme3/quiz')}
            >
              테스트: 바로 퀴즈로 이동
            </button>
          </>
        ) : (
          <>
            {/* QR 스캐너 */}
            <div className="qr-scanner-section">
              <h2 className="scanner-title">QR 코드를 스캔하세요</h2>
              <div id="qr-reader"></div>
              <button className="cancel-scan-button" onClick={handleCancelScan}>
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Theme3QRScanPage;
```

---

## 🔒 고급 GPS Spoofing 방지 기법

### 1. 위치 정확도 및 속도 검증

**src/utils/locationSecurity.js**
```javascript
class LocationSecurity {
  constructor() {
    this.previousLocation = null;
    this.previousTimestamp = null;
  }

  // 위치 정확도 검증
  validateAccuracy(accuracy) {
    if (accuracy > 100) {
      return {
        valid: false,
        reason: 'GPS 신호가 약합니다. 실외에서 다시 시도해주세요.'
      };
    }
    return { valid: true };
  }

  // 이동 속도 검증 (순간이동 방지)
  validateSpeed(currentLocation, timestamp) {
    if (!this.previousLocation) {
      this.previousLocation = currentLocation;
      this.previousTimestamp = timestamp;
      return { valid: true };
    }

    const distance = this.calculateDistance(
      this.previousLocation,
      currentLocation
    );
    const timeDiff = (timestamp - this.previousTimestamp) / 1000; // 초
    const speed = (distance / timeDiff) * 3.6; // km/h

    this.previousLocation = currentLocation;
    this.previousTimestamp = timestamp;

    // 200km/h 이상이면 의심 (비행기 속도)
    if (speed > 200) {
      return {
        valid: false,
        reason: '비정상적인 이동이 감지되었습니다.'
      };
    }

    return { valid: true };
  }

  // 타임스탬프 검증 (시간 조작 방지)
  validateTimestamp(deviceTimestamp) {
    const serverTime = Date.now();
    const diff = Math.abs(serverTime - deviceTimestamp);

    // 5분 이상 차이나면 의심
    if (diff > 5 * 60 * 1000) {
      return {
        valid: false,
        reason: '기기 시간이 정확하지 않습니다.'
      };
    }

    return { valid: true };
  }

  // Haversine 공식으로 거리 계산
  calculateDistance(pos1, pos2) {
    const R = 6371e3;
    const φ1 = (pos1.lat * Math.PI) / 180;
    const φ2 = (pos2.lat * Math.PI) / 180;
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // 종합 검증
  async verifyLocation(position, qrLocation) {
    const { latitude, longitude, accuracy } = position.coords;
    const timestamp = position.timestamp;

    // 1. 정확도 검증
    const accuracyCheck = this.validateAccuracy(accuracy);
    if (!accuracyCheck.valid) return accuracyCheck;

    // 2. 타임스탬프 검증
    const timestampCheck = this.validateTimestamp(timestamp);
    if (!timestampCheck.valid) return timestampCheck;

    // 3. 속도 검증
    const speedCheck = this.validateSpeed(
      { lat: latitude, lng: longitude },
      timestamp
    );
    if (!speedCheck.valid) return speedCheck;

    // 4. 거리 검증
    const distance = this.calculateDistance(
      { lat: latitude, lng: longitude },
      qrLocation
    );

    if (distance > 100) {
      return {
        valid: false,
        reason: `목적지까지 ${Math.round(distance)}m 떨어져 있습니다. 더 가까이 이동해주세요.`
      };
    }

    return {
      valid: true,
      distance: Math.round(distance)
    };
  }
}

export default new LocationSecurity();
```

### 2. 사용 예시

```javascript
import locationSecurity from '../utils/locationSecurity';

const verifyUserLocation = async (qrLocation) => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });

    const verification = await locationSecurity.verifyLocation(
      position,
      qrLocation
    );

    if (!verification.valid) {
      alert(verification.reason);
      return false;
    }

    console.log(`위치 인증 성공! 거리: ${verification.distance}m`);
    return true;

  } catch (error) {
    console.error('위치 확인 오류:', error);
    return false;
  }
};
```

---

## 📊 보안 모니터링 및 로깅

```javascript
// Firebase에 의심스러운 활동 로깅
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const logSuspiciousActivity = async (userId, reason, data) => {
  const db = getFirestore();
  await addDoc(collection(db, 'security_logs'), {
    userId,
    reason,
    data,
    timestamp: new Date(),
    userAgent: navigator.userAgent
  });
};
```

---

## 🎯 구현 체크리스트

- [ ] Kakao Maps API 키 발급
- [ ] react-kakao-maps-sdk 설치
- [ ] LocationMap 컴포넌트 생성
- [ ] GPS 위치 확인 기능 구현
- [ ] 거리 계산 로직 구현
- [ ] LocationSecurity 유틸리티 생성
- [ ] 정확도 검증 구현
- [ ] 속도 검증 구현
- [ ] QR 스캔 페이지에 통합
- [ ] HTTPS 적용
- [ ] 테스트 (실제 위치에서)
