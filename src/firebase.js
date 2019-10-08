import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyDNI_ZEm-Ke7gr-4E9UX-4damGfoZu3SG0",
  authDomain: "slack-recreated.firebaseapp.com",
  databaseURL: "https://slack-recreated.firebaseio.com",
  projectId: "slack-recreated",
  storageBucket: "slack-recreated.appspot.com",
  messagingSenderId: "779957814088",
  appId: "1:779957814088:web:b509ad66f6ee283ed4e97d",
  measurementId: "G-2EF7XYXEX1"
};
firebase.initializeApp(firebaseConfig);

export default firebase;