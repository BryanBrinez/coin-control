import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
