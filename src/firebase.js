import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDv35w3ADz8aoV1pTXhCy0ZdV4UWCbYm4k",
    authDomain: "kabaadi-waala.firebaseapp.com",
    databaseURL: "https://kabaadi-waala.firebaseio.com",
    projectId: "kabaadi-waala",
    storageBucket: "kabaadi-waala.appspot.com",
    messagingSenderId: "449285377078",
    appId: "1:449285377078:web:e81fe497dfc38769"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);