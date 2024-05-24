import { Text, StyleSheet, View, Button,TouchableOpacity, } from "react-native";
import handleNavigation from "../utils/handleNavigation";


export default function Summary({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={styles.registerContainer}>
        
        <TouchableOpacity onPress={() => handleNavigation(navigation, "Profile")}>
          <Text style={styles.registerLink}> Profile</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
