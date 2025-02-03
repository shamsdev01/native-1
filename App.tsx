import { StyleSheet, Text, View,Alert, Button, TouchableOpacity, Pressable } from "react-native";
import { theme } from "./theme";



 export default function App() {

  // Delete button Function
  const handleDelete = () => {
    Alert.alert("Are you sure you want to delete this item?","It will be gone Forever",[
      {
        text: "yes",
        onPress: () => console.log("Item deleted"),
      },
      {
        text: "cancel", 
        onPress: () => console.log("Item not deleted"),
      },
    ]);
  };

   return (
     <View style={styles.container}>

      {/* <Button title="Press me" onPress={() => alert("Button pressed")} /> */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
         style={styles.button}
         onPress={handleDelete}
         >
     <Text style={styles.buttonText}>Delete</Text>
     </TouchableOpacity>
       </View>
     </View>
   );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
     backgroundColor: "#fff",
     justifyContent: "center",
   },
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: "#1a759f",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
   justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { 
    color: theme.colorWhite,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
 });
