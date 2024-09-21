// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPu5cbHy-FO2pvM0PquNThaO472U_UxT4",
  authDomain: "lab4-firebase-150db.firebaseapp.com",
  projectId: "lab4-firebase-150db",
  storageBucket: "lab4-firebase-150db.appspot.com",
  messagingSenderId: "202700732074",
  appId: "1:202700732074:web:4906a173e70dd9b8d482d3",
  measurementId: "G-P55DRDS04Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {Fireapp, db, analytics};