import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore' 
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB55JAhVxVfJs5X1SnGBbcmJouS5I0yXXk",
    authDomain: "new-todo-list-61727.firebaseapp.com",
    databaseURL: "https://new-todo-list-61727.firebaseio.com",
    projectId: "new-todo-list-61727",
    storageBucket: "new-todo-list-61727.appspot.com",
    messagingSenderId: "518065518850",
    appId: "1:518065518850:web:f4fdd28e5da08d87"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.settings = ({ timestampsSnapshots: true })
  
  export default db;