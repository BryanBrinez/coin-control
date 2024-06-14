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

      <Text style={styles.summaryTittle}>Distribución por Categoria</Text> 

      <View style={styles.summaryInfoF}>
        <Text>Fecha  </Text>
        <SelectDate date={initDate} setDate={setInitDate}/>
        <Text>  //  </Text>
        <SelectDate date={endDate} setDate={setEndDate}/>
      </View>

      {isLoading ? <Text>Loading...</Text> :
        <View>
          <Text style={styles.summaryInfo}>Ingresos</Text>
          <LineGraphic data={data.groupIncomes} styles={styles} />
          <PieGraphic data={data.groupIncomes} />

          <Text style={styles.summaryInfo}>Gastos</Text>
          <LineGraphic data={data.groupExpenses} styles={styles} />
          <PieGraphic data={data.groupExpenses} />
          

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
  summaryTittle: {
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
  summaryInfoF: {
    fontSize: 15,
    flex : 1,
    flexDirection: 'row',
    margin: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  summaryInfo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#6e92c4',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    borderRadius: 10,
  },  
 
});
