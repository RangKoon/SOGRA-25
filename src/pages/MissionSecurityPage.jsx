import React, { useState } from 'react';
import './MissionSecurityPage.css';

// Haversine distance calculation function (from NaverMapPage)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// --- Mission Simulation Data ---
const MISSION_1_LOCATION = { name: "서울역", lat: 37.5547, lng: 126.9704 };
const MISSION_2_LOCATION = { name: "부산역", lat: 35.1147, lng: 129.0422 };
const IMPOSSIBLE_SPEED_KPH = 300; // 시속 300km/h 이상은 비정상으로 간주

const MissionSecurityPage = () => {
  const [mission1Data, setMission1Data] = useState(null);
  const [mission2Data, setMission2Data] = useState(null);
  const [result, setResult] = useState(null);

  const handleMission1Clear = () => {
    const data = {
      location: MISSION_1_LOCATION,
      timestamp: new Date(),
    };
    setMission1Data(data);
    setMission2Data(null); // Reset mission 2
    setResult(`'${data.location.name}'에서 미션 1 클리어! (시간: ${data.timestamp.toLocaleTimeString()})`);
  };

  const handleMission2Clear = () => {
    if (!mission1Data) {
      setResult("미션 1을 먼저 클리어해야 합니다.");
      return;
    }

    const mission2Time = new Date();
    const data = {
      location: MISSION_2_LOCATION,
      timestamp: mission2Time,
    };
    setMission2Data(data);

    // --- Security Check Logic ---
    const distanceKm = getDistanceFromLatLonInKm(
      mission1Data.location.lat,
      mission1Data.location.lng,
      data.location.lat,
      data.location.lng
    );

    const timeDiffSeconds = (data.timestamp - mission1Data.timestamp) / 1000;
    const timeDiffHours = timeDiffSeconds / 3600;

    // Avoid division by zero
    if (timeDiffHours === 0) {
        setResult(`'${data.location.name}'에서 미션 2 클리어! 하지만 이동 시간을 계산할 수 없습니다.`);
        return;
    }

    const speedKph = distanceKm / timeDiffHours;

    let resultMessage = `'${data.location.name}'에서 미션 2 클리어! (시간: ${data.timestamp.toLocaleTimeString()})\n`;
    resultMessage += `이동 거리: ${distanceKm.toFixed(2)} km\n`;
    resultMessage += `소요 시간: ${timeDiffSeconds.toFixed(2)} 초\n`;
    resultMessage += `계산된 속도: ${speedKph.toFixed(2)} km/h\n`;

    if (speedKph > IMPOSSIBLE_SPEED_KPH) {
      resultMessage += `\n[보안 경고] 비정상적인 이동 속도(시속 ${IMPOSSIBLE_SPEED_KPH}km 초과)가 감지되어 미션 클리어를 거절합니다.`;
    } else {
      resultMessage += `\n[보안 통과] 정상적인 이동 속도입니다. 미션 클리어를 승인합니다.`;
    }
    setResult(resultMessage);
  };

  return (
    <div className="mission-security-container">
      <h1>미션 속도 제한 (보안 절차 시뮬레이션)</h1>
      <p>미션 1(서울역)과 미션 2(부산역)를 클리어하여 속도를 검증합니다.</p>
      <div className="mission-buttons">
        <button onClick={handleMission1Clear}>'미션 1' 클리어 (서울역)</button>
        <button onClick={handleMission2Clear}>'미션 2' 클리어 (부산역)</button>
      </div>
      {result && (
        <div className="mission-result">
          <h3>시뮬레이션 결과</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default MissionSecurityPage;
