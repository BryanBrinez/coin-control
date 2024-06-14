import { Text, StyleSheet, ScrollView, View } from "react-native";
import { useState, useEffect } from "react";

import { getTransactions } from '../utils/firebase/transactions';
import SelectDate from "../utils/SelectDate";
import LineGraphic from "../utils/Graphics/LineGraphic";
import PieGraphic from "../utils/Graphics/PieGraphic";


export default function Summary() {

  const [initDate, setInitDate] = useState(new Date().toDateString());
  const [endDate, setEndDate] = useState(new Date().toDateString());

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ groupExpenses: {}, groupIncomes: {} });

  useEffect(() => {
    const unsubscribe = getTransactions((transactions) => {
      const reversedTransactions = transactions.slice().reverse();

      const groupIncomes = reversedTransactions
        .filter(item => item.type === 'Income')
        .reduce((acumulate, transaction) => {
          const category = transaction.category || "Uncategorized";
          if (!acumulate[category]) acumulate[category] = 0;
          acumulate[category] += transaction.balance ? parseFloat(transaction.balance) : 0;
          return acumulate;
        }, {});

      const groupExpenses = reversedTransactions
        .filter(item => item.type === 'Bill')
        .reduce((acumulate, transaction) => {
          const category = transaction.category || "Uncategorized";
          if (!acumulate[category]) acumulate[category] = 0;
          acumulate[category] += transaction.balance ? parseFloat(transaction.balance) : 0;
          return acumulate;
        }, {});

      // Calcular ingresos y gastos usando reversedTransactions
      const TotalIncome = reversedTransactions.filter(item => item.type === 'Income')
        .reduce((sum, item) => item.balance ? (sum + parseFloat(item.balance)) : 0, 0);

      const TotalExpenses = reversedTransactions
        .filter(item => item.type === 'Bill')
        .reduce((sum, item) => item.balance ? (sum + parseFloat(item.balance)) : 0, 0);

      setData({ TotalIncome, TotalExpenses, groupIncomes, groupExpenses })
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [])

  return (
    <ScrollView>

      <Text>Distribucion por Categoria</Text> 

      <View>
        <Text>Fecha</Text>
        <SelectDate initDate={initDate} setInitDate={setInitDate} styles={styles} />
        <SelectDate initDate={endDate} setInitDate={setEndDate} styles={styles} />
      </View>

      {isLoading ? <Text>Loading...</Text> :
        <View>
          <Text>Ingresos</Text>
          <LineGraphic data={data.groupIncomes} styles={styles} />
          <PieGraphic data={data.groupIncomes} />

          <Text>GASTOS</Text>
          <LineGraphic data={data.groupExpenses} styles={styles} />
          <PieGraphic data={data.groupIncomes} />
          

        </View>}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
});
