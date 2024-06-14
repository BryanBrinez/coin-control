import { Text, StyleSheet, View, Dimensions } from "react-native";
import { useState } from "react";

import { set } from "firebase/database";
import SelectDate from "../utils/SelectDate";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


export default function Summary({ navigation }) {

  const [initDate, setInitDate] = useState(new Date().toDateString());
  const [endDate, setEndDate] = useState(new Date().toDateString());

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];



  return (
    <View style={styles.container}>

      <Text>Distribucion por Categoria</Text>

      <View>
      <Text>Fecha</Text>
      <SelectDate initDate={initDate} setInitDate={setInitDate} styles={styles} />
      <SelectDate initDate={endDate} setInitDate={setEndDate} styles={styles} />
      </View>

      <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width*0.9} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  </View>

  <PieChart
  data={data}
  width={Dimensions.get("window").width*0.9}
  height={220}
  chartConfig={{
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`
  }}
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16
  }}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 50]}
  absolute
/>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
