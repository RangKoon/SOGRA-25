import React, { useEffect, useState } from 'react';
import './NaverMapPage.css';

// Haversine distance calculation function
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000; // Distance in m
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


const NaverMapPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null); // Dynamic target location
  const [distanceToTarget, setDistanceToTarget] = useState(null);

  // Per user feedback, using ncpKeyId. Note: Official docs suggest ncpClientId.
  const NAVER_MAP_KEY_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    if (!NAVER_MAP_KEY_ID || NAVER_MAP_KEY_ID === "YOUR_NAVER_MAP_CLIENT_ID") {
      setError("Naver Map Client ID is not configured. Please set VITE_NAVER_MAP_CLIENT_ID in your .env file.");
      setLoading(false);
      return;
    }

    // 1. Get current GPS location and set dynamic target
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentPosition(userPos);

          // Set target dynamically based on current position
          setTargetLocation({
            name: "테스트 목표 지점",
            lat: userPos.latitude + 0.001, // Approx 111 meters North
            lng: userPos.longitude + 0.001, // Approx 88 meters East
          });
        },
        (err) => {
          setError(`Geolocation Error: ${err.message}`);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }

    // 2. Load Naver Map script
    const scriptId = "naver-map-script";
    if (document.getElementById(scriptId)) {
      setLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_KEY_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      setError("Failed to load Naver Map script. Check your Client ID and registered URL in Naver Cloud Platform.");
      setLoading(false);
    };

    return () => {
      if (document.getElementById(scriptId)) {
        document.head.removeChild(script);
      }
    };
  }, [NAVER_MAP_KEY_ID]);

  useEffect(() => {
    if (!loading && !error && window.naver && currentPosition && targetLocation) {
      // Calculate distance
      const distance = getDistanceFromLatLonInM(
        currentPosition.latitude,
        currentPosition.longitude,
        targetLocation.lat,
        targetLocation.lng
      );
      setDistanceToTarget(distance.toFixed(2)); // Round to 2 decimal places

      const container = document.getElementById('naver-map');
      const mapOptions = {
        center: new window.naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        zoom: 15,
      };
      const map = new window.naver.maps.Map(container, mapOptions);

      // Add a marker for the current position
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        map: map,
        title: '현재 위치'
      });

      // Add a marker for the dynamic target location
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(targetLocation.lat, targetLocation.lng),
        map: map,
        title: targetLocation.name,
        icon: {
          content: '<div style="background-color:red;color:white;padding:5px;border-radius:5px;font-size:12px;">목표</div>',
          anchor: new window.naver.maps.Point(25, 26),
        },
      });
    }
  }, [loading, error, currentPosition, targetLocation]);

  if (loading) {
    return <div className="map-page-container">Loading Naver Map and GPS...</div>;
  }

  if (error) {
    return <div className="map-page-container error">Error: {error}</div>;
  }

  return (
    <div className="map-page-container">
      <h1>현재 위치 (네이버 지도)</h1>
      {distanceToTarget && (
        <h2>
          '테스트 목표 지점'까지의 거리: {distanceToTarget} 미터
        </h2>
      )}
      <div id="naver-map" className="naver-map-container"></div>
    </div>
  );
};

export default NaverMapPage;
