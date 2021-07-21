import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const initUserDetails = (authUser) => {
  db.collection("users").doc(authUser.user.uid).set({
    email: authUser.user.email,
    name: authUser.user.displayName,
    conversations: [],
    matches: [],
    swiped: [],
    isProfileComplete: false,
  });
};

export const registerWithEmail = (email, password, name) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
      });
      initUserDetails(authUser);
    })
    .catch((error) => {
      alert(error);
    });
};

export const logout = () => auth.signOut();

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);
