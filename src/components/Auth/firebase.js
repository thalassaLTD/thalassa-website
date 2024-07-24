import firebase from "firebase/compat/app";
import "firebase/auth";
// import "firebase/database";
// import "firebase/storage";

var config = {
  apiKey: "AIzaSyAfwsmdzFz-T_JwTQu3MbeWqa9thXoUisQ",
  authDomain: "uplyft-web.firebaseapp.com",
  projectId: "uplyft-web",
  storageBucket: "uplyft-web.appspot.com",
  messagingSenderId: "48767017756",
  appId: "1:48767017756:web:a7383dffd3277f009ad0d9",
  measurementId: "G-BZ07Y9W5D3"
};
firebase.initializeApp(config);


export default firebase;