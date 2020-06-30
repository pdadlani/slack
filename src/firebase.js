import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBuLH40JPTIikAhETbaGLRJu4J5em08QqI",
  authDomain: "slack-again.firebaseapp.com",
  databaseURL: "https://slack-again.firebaseio.com",
  projectId: "slack-again",
  storageBucket: "slack-again.appspot.com",
  messagingSenderId: "572947484363",
  appId: "1:572947484363:web:ce01ff5184e432016f954e",
  measurementId: "G-PZ6MFX9D7N",
};
firebase.initializeApp(firebaseConfig);;

export default firebase;