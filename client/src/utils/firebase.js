// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pro-app-fc4ad.firebaseapp.com",
  projectId: "pro-app-fc4ad",
  storageBucket: "pro-app-fc4ad.appspot.com",
  messagingSenderId: "1028726694927",
  appId: "1:1028726694927:web:cf9fbe040d756fda8f6f7a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);