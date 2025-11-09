import React, { useEffect, useState } from 'react';
import './MapPage.css';

const MapPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

  useEffect(() => {
    console.log("MapPage component mounted.");
    console.log("Using Kakao API Key (first 5 chars):", KAKAO_MAP_API_KEY ? KAKAO_MAP_API_KEY.substring(0, 5) : "Not found");

    if (!KAKAO_MAP_API_KEY || KAKAO_MAP_API_KEY === "YOUR_KAKAO_MAP_JAVASCRIPT_KEY") {
      const errorMsg = "Kakao Map API Key is not configured. Please set VITE_KAKAO_MAP_API_KEY in your .env file.";
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    // 1. Get current GPS location
    if (navigator.geolocation) {
      console.log("Requesting geolocation...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation successful:", position.coords);
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          const errorMsg = `Geolocation Error: ${err.message}`;
          console.error(errorMsg);
          setError(errorMsg);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
    }

    // 2. Load Kakao Map script
    const scriptId = "kakao-map-script";
    if (document.getElementById(scriptId)) {
      console.log("Kakao Map script already exists.");
      setLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    const scriptUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    script.src = scriptUrl;
    script.async = true;
    
    console.log("Loading Kakao Map script from:", scriptUrl);

    script.onload = () => {
      console.log("Kakao Map script loaded successfully.");
      window.kakao.maps.load(() => {
        console.log("Kakao Maps API is ready.");
        setLoading(false);
      });
    };

    script.onerror = (event) => {
      const errorMsg = "Failed to load Kakao Map script.";
      console.error(errorMsg, "Event:", event);
      setError(errorMsg);
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      console.log("MapPage component unmounting. Cleaning up script.");
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [KAKAO_MAP_API_KEY]);

  useEffect(() => {
    if (!loading && !error && window.kakao && currentPosition) {
      console.log("Initializing map...");
      const container = document.getElementById('kakao-map');
      const options = {
        center: new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // Add a marker to the current position
      const markerPosition = new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // Optionally, add an info window
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">현재 위치</div>',
      });
      infowindow.open(map, marker);
      console.log("Map initialized successfully.");
    }
  }, [loading, error, currentPosition]);

  if (loading) {
    return <div className="map-page-container">Loading Map and GPS...</div>;
  }

  if (error) {
    return <div className="map-page-container error">Error: {error}</div>;
  }

  return (
    <div className="map-page-container">
      <h1>현재 위치 지도</h1>
      <div id="kakao-map" className="kakao-map-container"></div>
    </div>
  );
};

export default MapPage;
