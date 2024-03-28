// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq3kwxr6xgBWHCozvRplztCMNB2coR0gU",
  authDomain: "chatapp-e719c.firebaseapp.com",
  projectId: "chatapp-e719c",
  storageBucket: "chatapp-e719c.appspot.com",
  messagingSenderId: "1032323919742",
  appId: "1:1032323919742:web:9cb20ff9ead2713643cd2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//below line tells the firebase that we are doing the authentication via google provider, mention different if you are using a different provider
export const provider = new GoogleAuthProvider();


export const db = getFirestore(app);

    