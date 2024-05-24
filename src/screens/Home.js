import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getTransactions } from "../utils/firebase/transactions";
import Transaction from "../components/TransactionCard";
import handleNavigation from "../utils/handleNavigation";

export default function Home({ navigation }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const unsubscribe = getTransactions((transactions) => {
      const reversedTransactions = transactions.slice().reverse(); 
      setTransaction(reversedTransactions);

      // Calcular ingresos y gastos como números
      const newIncome = transactions
        .filter(item => item.type === 'Income')
        .reduce((sum, item) => sum + parseFloat(item.balance), 0); // Convertir a número

      const newExpenses = transactions
        .filter(item => item.type === 'Bill')
        .reduce((sum, item) => sum + parseFloat(item.balance), 0); // Convertir a número
      
      setIncome(newIncome);
      setExpenses(newExpenses);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item, index }) => {
    const originalIndex = transaction.length - 1 - index; // Obtener el índice original en el array invertido

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TransactionInfo", { transaction: item, index: originalIndex });
        }}
      >
        <Transaction transaction={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text style={styles.title}>Administrador de dinero</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gastos</Text>
            <Text style={styles.infoValue}>{expenses}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ingresos</Text>
            <Text style={styles.infoValue}>{income}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={transaction}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxInfo: {
    backgroundColor: "#B5E36F",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoItem: {
    marginRight: 45,
    marginLeft: 45,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
