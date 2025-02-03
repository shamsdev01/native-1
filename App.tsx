import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "./components/ShoppingListitme";



 export default function App() {


   return (
     <View style={styles.container}>
        <ShoppingListItem name="Cofee" />
        <ShoppingListItem  name="Tea"/>
        <ShoppingListItem name="Sugar " />
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
