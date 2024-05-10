import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Summary from "../screens/Summary";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddReport from "../screens/AddReport";
import Notifications from "../screens/Notifications";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: true,
          headerTitle: "EcoFin",
        }}
      />
    </Stack.Navigator>
  );
}

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -20, // ajusta el botón para que sobresalga
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow, // añade sombra al botón
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#525fe1", // color de fondo blanco
          justifyContent: 'center', // centrar contenido verticalmente
          alignItems: 'center', // centrar contenido horizontalmente
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}


function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "journal" : "journal-outline";
          } else if (route.name === "Summary") {
            iconName = focused ? "pie-chart" : "pie-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Registros", headerShown: false }} // Opcional: etiqueta visible debajo del icono
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{ tabBarLabel: "Informes", headerShown: false }}
        // Opcional: etiqueta visible debajo del icono
      />
      <Tab.Screen
        name="AddReport"
        component={AddReport}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              onPress={() => navigation.navigate("AddReport")}
            >
              <Ionicons name="add" size={30} color="black" />
            </CustomTabBarButton>
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ tabBarLabel: "Notificaciones", headerShown: false }}
        // Opcional: etiqueta visible debajo del icono
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: "Perfil", headerShown: false }}
        // Opcional: etiqueta visible debajo del icono
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
