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

  export const editTransaction = async (transactionIndex, updatedTransactionData) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
  
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
  
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();
  
        if (userDocData && Array.isArray(userDocData.transactions)) {
          if (transactionIndex >= 0 && transactionIndex < userDocData.transactions.length) {
            const updatedTransactions = [...userDocData.transactions];
            updatedTransactions[transactionIndex] = {
              ...updatedTransactions[transactionIndex],
              ...updatedTransactionData,
            };
  
            await updateDoc(userDocRef, { transactions: updatedTransactions });
          } else {
            throw new Error("Índice de transacción no válido");
          }
        } else {
          throw new Error("No hay transacciones para este usuario");
        }
      } else {
        throw new Error("No hay usuario autenticado");
      }
    } catch (error) {
      throw error;
    }
  };