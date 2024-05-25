import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getTransactions } from "../utils/firebase/transactions";
import Transaction from "../components/TransactionCard";
import handleNavigation from "../utils/handleNavigation";

export default function Home({ navigation }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    const unsubscribe = getTransactions((transactions) => {
      const reversedTransactions = transactions.slice().reverse();

      // Agrupar transacciones por categoría
      const grouped = reversedTransactions.reduce((acc, transaction) => {
        const category = transaction.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(transaction);
        return acc;
      }, {});

      setGroupedTransactions(grouped);

      // Calcular ingresos y gastos usando reversedTransactions
      const newIncome = reversedTransactions
        .filter(item => item.type === 'Income')
        .reduce((sum, item) => sum + parseFloat(item.balance), 0);

      const newExpenses = reversedTransactions
        .filter(item => item.type === 'Bill')
        .reduce((sum, item) => sum + parseFloat(item.balance), 0);

      setIncome(newIncome);
      setExpenses(newExpenses);
    });

    return () => unsubscribe();
  }, []);

  const renderTransactionItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TransactionInfo", { transaction: item, index });
        }}
      >
        <Transaction transaction={item} />
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }) => {
    const category = item;
    return (
      <View>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
          data={groupedTransactions[category]}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderTransactionItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text style={styles.title}>Administrador de dinero</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gastos</Text>
            <Text style={styles.infoValue}>${expenses}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ingresos</Text>
            <Text style={styles.infoValue}>${income}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={Object.keys(groupedTransactions)}
        keyExtractor={(item, index) => item || index.toString()}
        renderItem={renderCategory}
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
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#D3D3D3",
    padding: 10,
  },
});
