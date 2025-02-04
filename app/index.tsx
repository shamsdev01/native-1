import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListitem";



 export default function App() {


   return (
     <View style={styles.container}>
        <ShoppingListItem name="Cofee" />
        <ShoppingListItem  name="Tea" isCompleted />
        <ShoppingListItem name="Sugar " isCompleted  />
     </View>
   );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
     backgroundColor: "#fff",
     justifyContent: "center",
   },

 });
