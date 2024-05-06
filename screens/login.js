import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import handleNavigation from "../utils/handleNavigation";



export default function Login({ navigation }) {
  return (
    <View style={styles.conteiner}>
      <Image
        source={require("../assets/loginimage.png")}
        style={styles.profile}
      />

      <View style={styles.card}>
        <View style={styles.boxText}>
          <TextInput
            placeholder="email@email.com"
            style={{ paddingHorizontal: 15 }}
          />
        </View>

        <View style={styles.boxText}>
          <TextInput placeholder="Password" style={{ paddingHorizontal: 15 }} />
        </View>

        <View style={styles.conteinerButton}>
          <TouchableOpacity style={styles.boxButton}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.registerContainer}> 
          <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => handleNavigation(navigation, "SignIn")}>
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
    marginVertical: 10, // Espacio vertical opcional entre la línea y otros elementos
  },

  registerContainer: {
    flexDirection: "row", // Para alinear horizontalmente el texto y el enlace
    alignItems: "center", // Para centrar verticalmente el texto y el enlace
    justifyContent: "center", // Para centrar horizontalmente el texto y el enlace
    marginTop: 10, // Espacio entre la línea y el contenedor de "Regístrate"
  },
  registerText: {
    marginRight: 5, // Espacio entre el texto "¿No tienes una cuenta?" y el enlace "Regístrate"
  },
  registerLink: {
    color: "#525fe1", // Color del enlace
  },
});
