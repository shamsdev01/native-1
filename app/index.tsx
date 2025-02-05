import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;  
  name: string;
}

const initialList : ShoppingListItemType[]= [ 
  {id: "1", name: "Cofee"},
  {id: "2", name: "Tea"},
  {id: "3", name: "Sugar"},
]

  export default function App() {

    const [shoppingList, setShoppingList] = useState(initialList);
    const [value, setValue] = useState<string>();
 
   const handleSubmit = () => {
     if (value) {
       const newShoppingList = [
         { id: new Date().toISOString(), name: value },
         ...shoppingList,
       ];
       setShoppingList(newShoppingList);
       setValue(undefined);
     }
   };

   return (
    < ScrollView style={styles.container} 
    contentContainerStyle={styles.contentContainer}
    stickyHeaderIndices={[0]}
    >
        <TextInput
         placeholder="Add Items" 
        style={styles.textInput} 
        value={value}
       onSubmitEditing={handleSubmit}
        returnKeyType="done"
        onChangeText={setValue}
       
        />
       {shoppingList.map((item) => (
        <ShoppingListItem name={item.name} key={item.id} />
      ))}
     </ScrollView>
   );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
     backgroundColor: "#fff",
     paddingTop: 12,  
    //  justifyContent: "center",  
   },

    contentContainer: {
      paddingBottom: 24,
    },



   textInput: {
      // height: 40, 
      borderColor: theme.colorLihgtGrey,
      borderWidth: 2,
      padding: 12,
      marginHorizontal: 12,
      marginBottom: 12,
      borderRadius: 50,
      backgroundColor: theme.colorWhite,
   }
 });
