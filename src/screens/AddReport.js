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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../utils/firebase/transactions";
import { icons } from "../utils/icons/icons"; // Asegúrate de ajustar la ruta según tu estructura de archivos

export default function AddReport() {
  const [income, setIncome] = useState({
    balance: "",
    type: "",
    category: "",
    description: "",
    date: new Date().toDateString(), // Inicializar la fecha en un formato legible
  });

  const [showPicker, setShowPicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const toggleDataPicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDataPicker = (event, selectedDate) => {
    if (event.type === "set") {
      toggleDataPicker(); // Ocultar el selector de fecha antes de actualizar el estado

      const currentDate = selectedDate || income.date;
      setIncome((prevIncome) => ({
        ...prevIncome,
        date: currentDate.toDateString(), // Convertir la fecha al formato deseado
      }));
    } else {
      toggleDataPicker(); // Ocultar el selector de fecha
    }
  };

  const handleIncomeChange = (key, value) => {
    setIncome((prevIncome) => ({
      ...prevIncome,
      [key]: value,
    }));
  };

  const handleCreateReport = async (incm) => {
    try {
      await addTransaction(incm);
      alert("Income Creado");
    } catch (error) {
      alert("Error al crear income: " + error.message);
    }
  };

  const categories = Object.keys(icons);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "income" && styles.selectedButton,
            ]}
            onPress={() => {
              handleIncomeChange("type", "Income");
              setSelectedType("income");
            }}
          >
            <Text style={styles.buttonText}>Ingreso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "bill" && styles.selectedButton,
            ]}
            onPress={() => {
              handleIncomeChange("type", "Bill");
              setSelectedType("bill");
            }}
          >
            <Text style={styles.buttonText}>Gasto</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="$1000"
          style={styles.input}
          value={income.balance}
          onChangeText={(text) => handleIncomeChange("balance", text)}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.inputText}>
            {income.category ? income.category : "Seleccionar Categoría"}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Descripción"
          style={styles.input}
          value={income.description}
          onChangeText={(text) => handleIncomeChange("description", text)}
        />
        <Pressable onPress={toggleDataPicker}>
          <TextInput
            placeholder="Fecha"
            style={[styles.input]}
            value={income.date}
            editable={false}
          />
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={new Date()} // Valor inicial del selector de fecha
            mode="date"
            display="spinner"
            onChange={onChangeDataPicker}
            onDismiss={toggleDataPicker} // Ocultar el selector de fecha cuando se descarta
          />
        )}
        <View style={styles.conteinerButton}>
          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handleCreateReport(income)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>

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
                    handleIncomeChange("category", category);
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
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#cccccc40",
    borderRadius: 15,
    marginVertical: 10,
  },
  inputText: {
    color: "#000",
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
});
