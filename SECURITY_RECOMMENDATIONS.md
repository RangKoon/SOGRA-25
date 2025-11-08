# 보안 개선 권장사항

## 🔐 GPS Spoofing 방지 전략

### 1. 다층 검증 시스템 (권장)

#### A. 위치 정확도 검증
```javascript
if (position.coords.accuracy > 100) {
  // 정확도가 100m 이상이면 의심
  alert('GPS 신호가 불안정합니다. 실외에서 다시 시도해주세요.');
}
```

#### B. 시간 기반 이동 거리 검증
```javascript
// 이전 위치와 현재 위치 간 이동 속도 계산
const speed = distance / timeDiff;
if (speed > 200) { // 200km/h 이상이면 의심
  // GPS spoofing 의심
}
```

#### C. 센서 데이터 교차 검증
```javascript
// 가속도계, 자이로스코프 데이터와 GPS 데이터 비교
// 움직임 없는데 위치만 변경되면 의심
```

#### D. IP 기반 지역 검증
```javascript
// IP 주소 기반 대략적 위치와 GPS 위치 비교
// 너무 멀리 떨어져 있으면 의심
```

### 2. 서버 사이드 검증 (가장 강력)

```javascript
// Firebase Functions 사용
exports.verifyLocation = functions.https.onCall(async (data, context) => {
  const { latitude, longitude, timestamp } = data;
  const userId = context.auth.uid;

  // 1. 이전 위치와 비교
  // 2. IP 주소 확인
  // 3. 타임스탬프 검증
  // 4. QR 코드 위치와 거리 계산

  const distance = calculateDistance(qrLocation, userLocation);
  if (distance > 100) { // 100m 이내여야 함
    return { verified: false, reason: 'too_far' };
  }

  return { verified: true };
});
```

### 3. QR 코드에 위치 정보 암호화

```javascript
// QR 코드 생성 시
const qrData = {
  location: { lat: 36.3504, lng: 127.3845 },
  timestamp: Date.now(),
  hash: crypto.createHash('sha256')
    .update(`${lat}${lng}${secretKey}`)
    .digest('hex')
};
```

---

## 🛡️ 추가 보안 조치

### 1. HTTPS 적용 (필수)

**vite.config.js 수정**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: true,
  }
});
```

### 2. 강화된 비밀번호 정책

**SignupPage.jsx 개선**
```javascript
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  if (!hasUpperCase || !hasLowerCase) {
    return '대문자와 소문자를 포함해야 합니다.';
  }
  if (!hasNumbers) {
    return '숫자를 포함해야 합니다.';
  }
  if (!hasSpecialChar) {
    return '특수문자를 포함해야 합니다.';
  }
  return null;
};
```

### 3. Rate Limiting (무차별 대입 공격 방지)

**Firebase Security Rules**
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null &&
              !root.child('rateLimits/' + auth.uid).exists() ||
              root.child('rateLimits/' + auth.uid).val() < now - 60000"
  }
}
```

**클라이언트 측**
```javascript
// 로그인 시도 횟수 제한
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15분

const checkLoginAttempts = () => {
  const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
  const now = Date.now();

  if (attempts.count >= MAX_ATTEMPTS && now - attempts.lastAttempt < LOCKOUT_TIME) {
    const remainingTime = Math.ceil((LOCKOUT_TIME - (now - attempts.lastAttempt)) / 60000);
    throw new Error(`너무 많은 시도. ${remainingTime}분 후 다시 시도하세요.`);
  }
};
```

### 4. XSS 추가 방지

**Input Sanitization**
```javascript
import DOMPurify from 'isomorphic-dompurify';

// 사용자 입력 정제
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// 사용 예
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: sanitizeInput(value)
  }));
};
```

### 5. Content Security Policy (CSP)

**index.html 추가**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://www.gstatic.com https://apis.google.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;">
```

### 6. 민감한 정보 보호

**환경 변수 사용**
```bash
# .env 파일 생성 (절대 커밋하지 말 것!)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_KAKAO_API_KEY=your_kakao_key
```

**.gitignore에 추가**
```
.env
.env.local
.env.production
```

**firebase/config.js**
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

### 7. 에러 메시지 개선 (정보 노출 방지)

```javascript
// Before (취약)
case 'auth/user-not-found':
  setError('존재하지 않는 사용자입니다.');

// After (안전)
case 'auth/user-not-found':
case 'auth/wrong-password':
  setError('이메일 또는 비밀번호가 올바르지 않습니다.');
```

---

## 📱 QR 코드 라이브러리 비교

### html5-qrcode (현재 사용 중) ✅
**장점:**
- 안정적이고 성숙한 라이브러리
- 다양한 QR 포맷 지원
- 카메라 선택 기능
- TypeScript 지원

**단점:**
- React 친화적이지 않음
- 수동 cleanup 필요

### react-qr-reader ⚠️
**장점:**
- React 컴포넌트로 사용 편리
- Hooks 지원

**단점:**
- 더 이상 유지보수되지 않음 (deprecated)
- 최신 React 버전 호환성 문제

### 권장: react-qr-scanner (대안)
```bash
npm install react-qr-scanner
```

**장점:**
- 활발히 유지보수됨
- React 19 호환
- 간단한 API

**사용 예:**
```javascript
import { QrScanner } from 'react-qr-scanner';

<QrScanner
  onDecode={(result) => console.log(result)}
  onError={(error) => console.log(error?.message)}
/>
```

### 최종 권장: **현재 html5-qrcode 유지**
- 이미 잘 작동하고 있음
- 안정적이고 기능이 풍부함
- 변경 시 리스크 > 이득

---

## 🎯 우선순위별 구현 순서

### 즉시 (Critical)
1. HTTPS 적용
2. 환경 변수로 API 키 이동
3. 에러 메시지 개선

### 단기 (High)
4. 강화된 비밀번호 정책
5. Rate Limiting
6. GPS Spoofing 기본 검증

### 중기 (Medium)
7. XSS Sanitization
8. CSP 헤더
9. 서버 사이드 위치 검증

### 장기 (Low)
10. 보안 감사 도구 도입
11. 침투 테스트
