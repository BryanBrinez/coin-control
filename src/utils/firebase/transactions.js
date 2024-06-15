import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, updateDoc,getDoc,onSnapshot   } from "firebase/firestore";

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

  
export const editTransaction = async (transactionId, updatedTransaction) => {
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
        updatedTransactions = userDocData.transactions.map(transaction => {
          if (transaction.id === transactionId) {
            return updatedTransaction;
          } else {
            return transaction;
          }
        });
      } else {
        throw new Error("No hay transacciones existentes");
      }

      await updateDoc(userDocRef, { transactions: updatedTransactions });
    } else {
      throw new Error("No hay usuario autenticado");
    }
  } catch (error) {
    throw error;
  }
};
  

  export const getTransactions = (callback) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
  
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
  
        return onSnapshot(userDocRef, (docSnapshot) => {
          const userDocData = docSnapshot.data();
          if (userDocData && Array.isArray(userDocData.transactions)) {
            callback(userDocData.transactions);
          } else {
            callback([]);
          }
        });
      } else {
        throw new Error("No hay usuario autenticado");
      }
    } catch (error) {
      throw error;
    }
  };