import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmbWaT6GBh3MVQ82rU66RfBdv5OvX9tm8",
  authDomain: "samgen-1c42d.firebaseapp.com",
  databaseURL: "https://samgen-1c42d.firebaseio.com",
  projectId: "samgen-1c42d",
  storageBucket: "samgen-1c42d.appspot.com",
  messagingSenderId: "1091973795817",
  appId: "1:1091973795817:web:21ac8298fcf8c33fad4578",
  measurementId: "G-KGJYTT09JJ",
};

const app = firebase.initializeApp(firebaseConfig);
export { app };
