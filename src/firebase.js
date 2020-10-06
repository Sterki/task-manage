import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDLvnIUh1IJ2x-gxwpafmsvL1Npq1sUTgk",
  authDomain: "fir-task-c5e07.firebaseapp.com",
  databaseURL: "https://fir-task-c5e07.firebaseio.com",
  projectId: "fir-task-c5e07",
  storageBucket: "fir-task-c5e07.appspot.com",
  messagingSenderId: "872809845647",
  appId: "1:872809845647:web:30c9ec63e020cc561971fa",
  measurementId: "G-JKQD59C117",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const db = firebaseApp.firestore();

const storage = firebaseApp.storage();

export { auth, db, storage };
