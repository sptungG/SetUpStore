import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAE4160EvhJ4h7zdTvgLkTDh-3Ij6Jnq8M",
  authDomain: "setupstore-4dc89.firebaseapp.com",
  projectId: "setupstore-4dc89",
  storageBucket: "setupstore-4dc89.appspot.com",
  messagingSenderId: "776677953635",
  appId: "1:776677953635:web:3430f8a2cbc2e0eef8a856",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
