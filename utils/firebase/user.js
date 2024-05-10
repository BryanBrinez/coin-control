import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";

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
      income: [],
      bills: [],
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
