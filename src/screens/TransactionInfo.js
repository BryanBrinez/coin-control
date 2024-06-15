import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { editTransaction } from "../utils/firebase/transactions";

export default function TransactionInfo({ route, navigation }) {
  const { transaction, index } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(transaction.type);
  const [balance, setBalance] = useState(transaction.balance.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    const updatedTransaction = {
      ...transaction,
      type,
      balance: parseFloat(balance),
      category,
      date,
      description,
    };

    try {
      await editTransaction(index, updatedTransaction);
      setIsEditing(false);
      navigation.goBack(); // Regresar a la página anterior después de guardar
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      // Aquí puedes manejar el error en la interfaz de usuario si es necesario
    } finally {
      setLoading(false);
    }
  };

  const handleDoubleTap = () => {
    setIsEditing(true);
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
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Guardar</Text>
            )}
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
