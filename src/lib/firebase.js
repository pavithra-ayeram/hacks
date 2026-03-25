// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZrLMSQ1jEVqE6a1ZCKNy21-87D8HnHhA",
  authDomain: "habospa.firebaseapp.com",
  databaseURL: "https://habospa-default-rtdb.firebaseio.com",
  projectId: "habospa",
  storageBucket: "habospa.firebasestorage.app",
  messagingSenderId: "191826808772",
  appId: "1:191826808772:web:e4b994217ab512fcde1e91",
  measurementId: "G-1LKK10W3DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);