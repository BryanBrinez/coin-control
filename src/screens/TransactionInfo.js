import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Importar DateTimePicker
import { editTransaction } from "../utils/firebase/transactions";
import { icons } from "../utils/icons/icons";

export default function TransactionInfo({ route, navigation }) {
  const { transaction, index } = route.params;

  console.log("index: " + index);

  const [isEditing, setIsEditing] = useState(false);

  const [type, setType] = useState(transaction.type);
  const [balance, setBalance] = useState(transaction.balance);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedType, setSelectedType] = useState(transaction.type);
  const [showPicker, setShowPicker] = useState(false); // Estado para mostrar el DatePicker
  const [loading, setLoading] = useState(false);

  const toggleDataPicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDataPicker = (event, selectedDate) => {
    if (event.type === "set") {
      toggleDataPicker(); // Ocultar el selector de fecha antes de actualizar el estado

      const currentDate = selectedDate || date;
      setDate(currentDate.toDateString()); // Convertir la fecha al formato deseado
    } else {
      toggleDataPicker(); // Ocultar el selector de fecha
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const updatedTransaction = {
      type,
      balance,
      category,
      date,
      description,
    };

    try {
      await editTransaction(index, updatedTransaction);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating transaction:", error);
      // Aquí podrías agregar una lógica para manejar el error
    } finally {
      setLoading(false);
    }
  };

  let lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      setIsEditing(true);
    } else {
      lastTap = now;
    }
  };
  const categories = Object.keys(icons);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Pressable onPress={handleDoubleTap}>
          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === "Income" && styles.selectedButton,
                ]}
                onPress={() => {
                  setType("Income");
                  setSelectedType("Income");
                }}
              >
                <Text style={styles.buttonText}>Ingreso</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === "Bill" && styles.selectedButton,
                ]}
                onPress={() => {
                  setType("Bill");
                  setSelectedType("Bill");
                }}
              >
                <Text style={styles.buttonText}>Gasto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Text style={styles.typeButton}>{type}</Text>
            </View>
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
            <Text style={styles.value}>{balance}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Categoría:</Text>
          {isEditing ? (
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={styles.inputText}>
                {category ? category : "Seleccionar Categoría"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.value}>{category}</Text>
          )}
        </Pressable>

        <Pressable onPress={handleDoubleTap}>
          <Text style={styles.label}>Fecha:</Text>
          {isEditing ? (
            <Pressable onPress={toggleDataPicker}>
              <TextInput
                placeholder="Fecha"
                style={styles.input}
                value={date}
                editable={false}
              />
            </Pressable>
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
          >{loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar</Text>
          )}
            
          </TouchableOpacity>
        )}

        {showPicker && (
          <DateTimePicker
            value={new Date()} // Valor inicial del selector de fecha
            mode="date"
            display="spinner"
            onChange={onChangeDataPicker}
            onDismiss={toggleDataPicker} // Ocultar el selector de fecha cuando se descarta
          />
        )}

        <Modal
          visible={showCategoryModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.categoryContainer}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryButton}
                    onPress={() => {
                      setCategory(category);
                      setShowCategoryModal(false);
                    }}
                  >
                    {icons[category]}
                    <Text style={styles.categoryLabel}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCategoryModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  saveButton: {
    backgroundColor: "#525fe1",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  categoryButton: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryLabel: {
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "80%",
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#525fe1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  typeButton: {
    backgroundColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#525fe1",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
