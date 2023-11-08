import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLjsym9Vlgn9M7Y6L-AqrB2ifpFDPYHGc",
  authDomain: "react-native-publication-5b963.firebaseapp.com",
  projectId: "react-native-publication-5b963",
  storageBucket: "react-native-publication-5b963.appspot.com",
  messagingSenderId: "334842187401",
  appId: "1:334842187401:web:088d4fbb1b987a1e250058",
  measurementId: "G-5PS71XT405",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
