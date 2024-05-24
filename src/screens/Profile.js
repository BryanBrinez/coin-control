import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { editUser, getUser } from "../utils/firebase/user";
import { FIREBASE_AUTH } from "../../firebase-config";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = getUser((userData) => {
      setUser(userData);
      setName(userData?.name || "");
      setPhoneNumber(userData?.phoneNumber || "");
      setDescription(userData?.description || "");
    });

    return unsubscribe;
  }, []);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      await editUser(user.uid, name, description, phoneNumber);
      setIsEditing(false);
      console.log("Usuario actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      // Aquí puedes agregar una notificación o mensaje de error al usuario
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        <Image
          source={{ uri: "https://i.imgur.com/t3n532j.jpg" }}
          style={styles.profileImage}
        />
        {isEditing ? (
          <TextInput
          style={styles.inputEdit}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.nameText}>{name}</Text>
        )}
        {isEditing ? (
          <TextInput
          style={styles.inputEdit}
            value={description}
            onChangeText={setDescription}
          />
        ) : (
          <Text style={styles.infoText}>{description}</Text>
        )}
        <Text style={styles.infoText}>
          Activo desde{" "}
          {user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "No creation time data"}
        </Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoSectionHeader}>
          <Text style={{ ...styles.infoSectionTitle, opacity: 0.9 }}>
            Información personal
          </Text>
          <TouchableOpacity onPress={isEditing ? handleSavePress : handleEditPress}>
            <FontAwesome name={isEditing ? "save" : "edit"} size={24} color="#525fe1" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Entypo name="email" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>Email</Text>
          </View>
          <Text style={styles.infoDetails}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <FontAwesome name="phone" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>Teléfono</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoDetails}>{phoneNumber}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="location-outline" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>Ubicación</Text>
          </View>
          <Text style={styles.infoDetails}>Colombia</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={styles.registerLink}> Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  basicInfo: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  infoText: {
    fontSize: 20,
    marginTop: 10,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  infoSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
  },
  infoIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoDetails: {
    marginLeft: 15,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 15,
    fontSize: 20,
  },
  inputEdit: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    
    marginLeft: 15,
    fontSize: 20,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: "#525fe1",
    padding: 10,
    borderRadius: 5,
  },
});
