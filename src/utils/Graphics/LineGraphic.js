import { Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";


function LineGraphic({ data, styles }) {
  return (
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
  )
}

export default LineGraphic