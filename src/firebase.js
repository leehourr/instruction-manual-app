// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCslVxxCgYPC9gklrjnORjNy2OwRGkTec4",

  authDomain: "instruction-manuals.firebaseapp.com",

  projectId: "instruction-manuals",

  storageBucket: "instruction-manuals.appspot.com",

  messagingSenderId: "279238466115",

  appId: "1:279238466115:web:4417191cb42752aa2812f6",

  measurementId: "G-KEH62WWKQZ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
