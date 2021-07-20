import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkn9ch1-_p55uf2yrFwK6b6VusA6fKdoA",
    authDomain: "e-clone-965d6.firebaseapp.com",
    projectId: "e-clone-965d6",
    storageBucket: "e-clone-965d6.appspot.com",
    messagingSenderId: "889086971068",
    appId: "1:889086971068:web:a070eb1702d3580dc2d4b9",
    measurementId: "G-XHE8SVHLKL"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : 
  firebase.app();
  console.log(app)

  const db = app.firestore()

  export default db
