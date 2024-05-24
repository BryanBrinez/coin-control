import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, setDoc, getDoc,onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const createUser = async (name, email, password, balance) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  try {
    // Crear el usuario en Firebase Authentication
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    const newUser = {
      name: name,
      email: email,
      balance: balance,
      transactions: []
    };

    // Guardar datos adicionales del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), newUser);
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  const auth = FIREBASE_AUTH;
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
  } catch (error) {
    throw error;
  }
};

export const getUser = (callback) => {
  const auth = getAuth();
  const db = FIREBASE_DB;

  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid } = user; // Extract the UID from the user object

      const userDocRef = doc(db, "users", uid);

      const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const combinedData = { ...user, ...userData }; // Merge user and doc data
          callback(combinedData);
        } else {
          console.warn("User document not found for UID:", uid);
          callback(user); // Return basic auth data if doc not found
        }
      });

      return unsubscribeSnapshot;
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Error in onAuthStateChanged:", error);
    callback(null);
  });

  return unsubscribeAuth;
};