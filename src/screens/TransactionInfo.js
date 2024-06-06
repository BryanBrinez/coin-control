import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";


export default function TransactionInfo({ route, navigation }) {
  const { transaction } = route.params;

  const [isEditing, setIsEditing] = useState(false);

  const [type, setType] = useState(transaction.type);
  const [balance, setBalance] = useState(transaction.balance);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description);

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios, por ejemplo, actualizar la transacción en la base de datos.
    console.log("Datos guardados:", { type, balance, category, date, description });
    navigation.goBack();
  };


  let lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      setIsEditing(true);
    } else {
      lastTap = now;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Tipo:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={type}
              onChangeText={setType}
            />
          ) : (
            <Text style={styles.value}>{type}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Balance:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={balance}
              onChangeText={setBalance}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.value}>${balance}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Categoría:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
            
          ) : (
            <Text style={styles.value}>{category}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Fecha:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
            />
          ) : (
            <Text style={styles.value}>{date}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Descripción:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />
          ) : (
            <Text style={styles.value}>{description}</Text>
          )}
        </Pressable>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  card: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
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
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#cccccc40",
    borderRadius: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  saveButton: {
    backgroundColor: '#525fe1',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
