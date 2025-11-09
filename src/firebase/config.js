import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 설정
// TODO: Firebase 콘솔에서 프로젝트를 생성하고 아래 설정을 업데이트하세요
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Authentication 초기화
export const auth = getAuth(app);

export default app;
