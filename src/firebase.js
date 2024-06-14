// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhi8GX7hOqOeoSsFZiANmgI0NvHX4k3C0",
  authDomain: "smart-attendance-system-eac54.firebaseapp.com",
  databaseURL: "https://smart-attendance-system-eac54-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-attendance-system-eac54",
  storageBucket: "smart-attendance-system-eac54.appspot.com",
  messagingSenderId: "779807802378",
  appId: "1:779807802378:web:72a897e4f8d32c90a08bf3",
  measurementId: "G-RMJPWF7X2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Firebase authentication with Google 
export const provider = new GoogleAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);