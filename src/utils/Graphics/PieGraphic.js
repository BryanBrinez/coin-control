
import {  Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";


const dataConfig = (groupExpenses) => {
  const colorList = ["#ff4d4d", "#9aff9a", "#4d4dff", "#ffff4d", "#ff9aff", "#9affff", "#FFF", "#000"];
  const datos = []
  Object.keys(groupExpenses).map((key, index) => {
    datos.push({
      name: key,
      population: groupExpenses[key],
      color: colorList[index],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    })
  })
  return datos;
}


export default function PieGraphic({ data , styles }) {

  return (
     <PieChart
          data={dataConfig(data)}
          width={Dimensions.get("window").width * 0.9}
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
          center={[10, 10]}
          absolute
        />
  )
}
