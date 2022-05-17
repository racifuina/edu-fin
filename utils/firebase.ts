// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIQC6ZiCzXzYFZBA5VXWfabTwkoOIaBrU",
  authDomain: "edu-fin.firebaseapp.com",
//   databaseURL: "",
  projectId: "edu-fin",
  storageBucket: "edu-fin.appspot.com",
  messagingSenderId: "949601664073",
  appId: "1:949601664073:web:abfe875ef31f024f891398"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);