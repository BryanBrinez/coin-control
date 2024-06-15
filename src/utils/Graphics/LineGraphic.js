import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";


function LineGraphic({ data, styles }) {
  return ( 
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <LineChart
      data={{
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data)
          }
        ]
      }}
      width={Dimensions.get("window").width * 0.9} // from react-native
      height={220}
      yLabelsOffset = {10}
      xLabelsOffset = {5}
      segments = {6}
      fromZero={true}
      yAxisLabel="$"
      yAxisSuffix=""
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#6e92c4",
        backgroundGradientTo: "#a3bbda",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForLabels: {
          fontSize: 13, // Ajusta este valor para cambiar el tamaño de las etiquetas
        },
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: "#426ba3"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
  )
}

export default LineGraphic