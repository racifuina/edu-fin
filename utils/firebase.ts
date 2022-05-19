// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDIQC6ZiCzXzYFZBA5VXWfabTwkoOIaBrU',
    authDomain: 'edu-fin.firebaseapp.com',
    databaseURL: 'https://edu-fin.firebaseio.com',
    projectId: 'edu-fin',
    storageBucket: 'edu-fin.appspot.com',
    messagingSenderId: '949601664073',
    appId: '1:949601664073:web:abfe875ef31f024f891398',
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
