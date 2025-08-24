// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4v6YRDeD2mri2c6HkyDYYTsSwI1E_anY",
  authDomain: "netflix-gpt-d2d2f.firebaseapp.com",
  projectId: "netflix-gpt-d2d2f",
  storageBucket: "netflix-gpt-d2d2f.firebasestorage.app",
  messagingSenderId: "661525978943",
  appId: "1:661525978943:web:8571efb4df94c9bcfa7d8a",
  measurementId: "G-HT07G721T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth };
