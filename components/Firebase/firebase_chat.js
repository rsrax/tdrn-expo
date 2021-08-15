import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbeowIJDZ61kCWhvMTqUTJGMrfnuQggm0",
    authDomain: "clone-82abe.firebaseapp.com",
    projectId: "clone-82abe",
    storageBucket: "clone-82abe.appspot.com",
    messagingSenderId: "891 921664382",
    appId: "1:891921664382:web:b01e30a7668bbf814f0b2f"
  };
let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}

const db=firebase.firestore();
const auth=firebase.auth();

export { db , auth };