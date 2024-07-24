import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjiX6ehwKmrFQIz8SCxbzEqvuYXXXxlgo",
  authDomain: "registro-login-a7328.firebaseapp.com",
  projectId: "registro-login-a7328",
  storageBucket: "registro-login-a7328.appspot.com",
  messagingSenderId: "1016283024337",
  appId: "1:1016283024337:web:4987b87040b81ffe4caef0",
  measurementId: "G-26BBPSQNBP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);