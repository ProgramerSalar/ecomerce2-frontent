import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import * as firebase from "firebase";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLymDiKYxJ7uTaAC4ulUedvyCKXutqwVs",
  authDomain: "nsz-6-273ec.firebaseapp.com",
  projectId: "nsz-6-273ec",
  storageBucket: "nsz-6-273ec.appspot.com",
  messagingSenderId: "605701838841",
  appId: "1:605701838841:web:6dd5234ad3abfc801ecf28",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
