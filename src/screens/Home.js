
import Transaction from "../components/TransactionCard";

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(-200);

  useEffect(() => {
    // Cargar datos desde el almacenamiento local o una API
    setIncome(500);
    setExpenses(-200);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text style={styles.title}>Administrador de dinero</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gastos</Text>
            <Text style={styles.infoValue}>-30</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ingresos</Text>
            <Text style={styles.infoValue}>20</Text>
          </View>
        </View>
      </View>
      <Transaction category="Aperitivos" amount="-10.00" iconName="Aperitivos" />
      <Transaction category="Transporte" amount="-15.00" iconName="Transporte" />
      <Transaction category="Compras" amount="-20.00" iconName="Compras" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  boxInfo: {
    backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10, // Add vertical margin for spacing
  },
  title: {
    fontSize: 20,
    fontWeight: "bold", // Make title bold
  },
  infoItem: {
    alignItems: "center",
    marginHorizontal: 40, // Add horizontal margin for separation
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 5, // Add space between label and value
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold", // Make value bold
  },
});
