import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { Component, useState } from "react";
import handleNavigation from "../utils/handleNavigation";
import { createUser } from "../utils/firebase/user";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (email, password) => {
    try {
      await createUser(name, email, password, balance);
      alert("Usuario creado");
    } catch (error) {
      alert("Error al crear usuario: " + error.message);
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
            placeholder="Nombre"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.boxText}>
          <TextInput
            placeholder="email@email.com"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.boxText}>
          <TextInput
            placeholder="$1000"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setBalance(text)}
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
            onPress={() => handleCreateUser(email, password)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => handleNavigation(navigation, "Login")}
          >
            <Text style={styles.registerLink}> Inicia sesión</Text>
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
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
