import firebase from 'firebase'
import "firebase/auth"
import "firebase/storage"

var config = {
    apiKey: "AIzaSyBVUqeJOAgubOvJTy4omnjTK8BIBsgAIzQ",
    authDomain: "patientslikeme-f7e18.firebaseapp.com",
    databaseURL: "https://patientslikeme-f7e18.firebaseio.com",
    projectId: "patientslikeme-f7e18",
    storageBucket: "patientslikeme-f7e18.appspot.com",
    messagingSenderId: "86386689661",
    appId: "1:86386689661:web:ecd4e8cfa164fe01d65314",
    measurementId: "G-VGG06RZQWM"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const auth = firebase.auth()
export const db = firebase.database()
export const storage = firebase.storage()
