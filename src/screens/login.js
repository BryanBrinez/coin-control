import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import handleNavigation from "../utils/handleNavigation";
import { login } from "../utils/firebase/user";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      alert("Se inicio sesion");
    } catch (error) {
      // Mostrar alerta de error
      alert("Error al iniciar sesion " + error.message);
    }
  };

  return (
    <View style={styles.conteiner}>
      <Image
        source={require("../../assets/loginimage.png")}
        style={styles.profile}
      />

      <View style={styles.card}>
        <View style={styles.boxText}>
          <TextInput
            placeholder="email@email.com"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.boxText}>
          <TextInput
            placeholder="Password"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.conteinerButton}>
          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handleLogin(email, password)}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => handleNavigation(navigation, "SignIn")}
          >
            <Text style={styles.registerLink}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
  },
  card: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    paddingVertical: 10,
    backgroundColor: "#cccccc40",
    borderRadius: 15,
    marginVertical: 10,
  },
  conteinerButton: {
    alignItems: "center",
  },
  boxButton: {
    backgroundColor: "#525fe1",
    borderRadius: 30,
    paddingVertical: 12,
    width: 150,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },

  line: {
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
    marginVertical: 10, 
  },

  registerContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10, 
  },
  registerText: {
    marginRight: 5, 
  },
  registerLink: {
    color: "#525fe1", 
  },
});
