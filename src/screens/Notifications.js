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
  
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [GroupedTotal, setGroupedTotal] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getTransactions((transactions) => {
      const reversedTransactions = transactions.slice().reverse();

      // Agrupar transacciones por categoría
      const grouped = reversedTransactions
        .filter(item => new Date(item.date) > new Date())
        .reduce((acumulate, transaction) => {
          const type = transaction.type || "Untype";
          if (!acumulate[type]) {acumulate[type] = []; }
          acumulate[type].push(transaction);
          return acumulate;
        }, {});

      setGroupedTransactions(grouped);

      const groupedTotal = reversedTransactions
        .filter(item => new Date(item.date) > new Date())
        .reduce((acumulate, transaction) => {
          const type = transaction.type || "Untype";
          if (!acumulate[type]) {acumulate[type] = 0; }
          acumulate[type] += parseFloat(transaction.balance);
          return acumulate;
        }, {});

        setGroupedTotal(groupedTotal);
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
        <View style={styles.categoryBar}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.categoryTitle}>${GroupedTotal[category]}</Text>
        </View>
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
  categoryBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
