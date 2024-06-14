import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Función para enviar notificación local
const sendLocalNotification = async () => {
    console.log("llego a la noti");
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Alerta de Finanzas',
            body: 'Tus gastos están cerca de tus ingresos!',
        },
        trigger: null, // Cambia este valor según cuándo quieras mostrar la notificación
    });
};

// Función para monitorear los gastos y enviar notificación si es necesario
const monitorExpenses = async (userId) => {
    const userDocRef = doc(FIREBASE_DB, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        const totalIncome = userDocData.income || 0;
        const transactions = userDocData.transactions || [];
        const totalExpenses = transactions.reduce((sum, transaction) => {
            if (transaction.type === 'expense') {
                return sum + transaction.amount;
            }
            return sum;
        }, 0);
        if (totalExpenses >= totalIncome * 0.9) { // Si los gastos son el 90% o más de los ingresos
            await sendLocalNotification(); // Asegúrate de esperar a que se envíe la notificación
        }
    }
};

// Función para agregar una nueva transacción
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

            // Monitorear los gastos después de agregar una nueva transacción
            await monitorExpenses(currentUser.uid); // Asegúrate de esperar a que se complete la función
        } else {
            throw new Error("No hay usuario autenticado");
        }
    } catch (error) {
        throw error;
    }
};

// Función para obtener las transacciones del usuario
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
                    monitorExpenses(currentUser.uid); // Monitorear los gastos después de obtener las transacciones
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

// Función para crear un canal de notificación (solo en Android)
export const createNotificationChannel = async () => {
    // Solicitar permisos de notificación
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permiso de notificación no concedido');
        return;
    }

    // Crear canal de notificaciones (solo en Android)
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('finance-alerts', {
            name: 'Finance Alerts',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};
