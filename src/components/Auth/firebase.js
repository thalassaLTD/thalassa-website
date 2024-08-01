import firebase from "firebase/compat/app";
import "firebase/auth";
// import "firebase/database";
// import "firebase/storage";
console.log("process.env.apiKey", process.env.REACT_APP_FIREBASE_KEY)
var config =  {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "thalassa-ltd.firebaseapp.com",
  projectId: "thalassa-ltd",
  storageBucket: "thalassa-ltd.appspot.com",
  messagingSenderId: "795268866861",
  appId: "1:795268866861:web:aed6e94e4c2b8650e6a9a4",
  measurementId: "G-Z2839JMWP2"
};
firebase.initializeApp(config);


export default firebase;