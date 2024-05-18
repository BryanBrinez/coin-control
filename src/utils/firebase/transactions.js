import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, updateDoc,getDoc  } from "firebase/firestore";

export const addTransaction = async (newTransaction) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
  
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
  
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();  
  
        let updatedTransactions = [];
  
        if (Array.isArray(userDocData.transactions)) {
          updatedTransactions = [...userDocData.transactions, newTransaction];
        } else {
          updatedTransactions = [newTransaction];
        }
  
        await updateDoc(userDocRef, { transactions: updatedTransactions });
      } else {
        throw new Error("No hay usuario autenticado");
      }
    } catch (error) {
      throw error;
    }
  };
  