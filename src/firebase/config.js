import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 설정
// TODO: Firebase 콘솔에서 프로젝트를 생성하고 아래 설정을 업데이트하세요
const firebaseConfig = {
  apiKey: "AIzaSyDVytMRnNPYsnGSbiJeDM3wPclfiODgVjo",
  authDomain: "sogra-25.firebaseapp.com",
  projectId: "sogra-25",
  storageBucket: "sogra-25.firebasestorage.app",
  messagingSenderId: "123738915963",
  appId: "1:123738915963:web:a5c2182cb4f9fe0cf20ede",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Authentication 초기화
export const auth = getAuth(app);

export default app;
