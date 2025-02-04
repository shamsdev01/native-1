import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListitem";
import { Link } from "expo-router";


 export default function App() {


   return (
     <View style={styles.container}>
      <Link href={"/counter"} style={{textAlign:"center", marginBottom: 18, fontSize:24  }} > Go to timer</Link>
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
