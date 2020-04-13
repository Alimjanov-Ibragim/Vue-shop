import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBbMr5-_2clLCUInDTwpfjLmYdFZpdXxS4",
  authDomain: "vue-shop-36f0f.firebaseapp.com",
  databaseURL: "https://vue-shop-36f0f.firebaseio.com",
  projectId: "vue-shop-36f0f",
  storageBucket: "vue-shop-36f0f.appspot.com",
  messagingSenderId: "300506707614",
  appId: "1:300506707614:web:120d7d186b22f7f860ed8f"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
