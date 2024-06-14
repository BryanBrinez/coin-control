import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getTransactions } from "../utils/firebase/transactions";
import Transaction from "../components/TransactionCard";
import TransactionCardSkeleton from "../components/skeletons/TransactionCard-skeleton";

const isBefore = (date1, dateNow) => { 
  console.log(date1< dateNow)
  return true
}

export default function Notifications({ navigation }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getTransactions((transactions) => {
      const reversedTransactions = transactions.slice().reverse();

      // Agrupar transacciones por categoría
      const grouped = reversedTransactions
        .filter(item => new Date(item.date) > new Date())
        .reduce((acc, transaction) => {
          const type = transaction.type || "Untype";
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(transaction);
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

      // Establecer loading a false cuando se han cargado los datos
      setLoading(false);
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
        {loading ? <TransactionCardSkeleton loading={true} /> : <Transaction transaction={item} />}
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }) => {
    const category = item;
    return (
      <View>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text>{income}</Text>
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

      <View>
        <Text style={styles.notificationsTittle}>Pendientes</Text>

        <View>
          {loading ? (
            // Mostrar skeletons mientras carga
            <FlatList
              data={[...Array(5)]} // Esto crea un array ficticio para mostrar 5 skeletons
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => <TransactionCardSkeleton loading={true} />}
            />
          ) : (
            // Mostrar transacciones una vez cargado
            <FlatList
              data={Object.keys(groupedTransactions)}
              keyExtractor={(item, index) => item || index.toString()}
              renderItem={renderCategory}
            />
          )}

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxInfo: {
    backgroundColor: "#6FB8E3",
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
  notificationsTittle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: '#6e92c4',
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,

  },
  infoTittle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#D3D3D3",
    padding: 10,
  },
});
