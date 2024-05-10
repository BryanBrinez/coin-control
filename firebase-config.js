// Import the functions you need from the SDKs you need
import { getReactNativePersistence  } from "firebase/auth";
import { initializeApp  } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDnTEPVh3Uou3H9xFR62ho9L1fJMy-Cf1Y",
  authDomain: "coin-control-43842.firebaseapp.com",
  projectId: "coin-control-43842",
  storageBucket: "coin-control-43842.appspot.com",
  messagingSenderId: "446415246524",
  appId: "1:446415246524:web:d26bc15016ac41eb202cb9",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
