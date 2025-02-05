import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;  
  name: string;
}

 

  export default function App() {

    const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
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
    <FlatList
    data={shoppingList}
    style={styles.container}
    ListEmptyComponent={
      <View style={styles.listEmptyContainer}>
        <Text>Your List is empty</Text>
      </View>
    }
    contentContainerStyle={styles.contentContainer}
    ListHeaderComponent={
      <TextInput
         placeholder="Add Items" 
        style={styles.textInput} 
        value={value}
       onSubmitEditing={handleSubmit}
        returnKeyType="done"
        onChangeText={setValue}
       
        />
    }
    stickyHeaderIndices={[0]}
    renderItem={({ item }) => { return<ShoppingListItem name={item.name} />}}

    />
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
   },
   listEmptyContainer:{
      justifyContent: "center",
      alignItems:"center", 
      marginVertical: 18,
   }
 });
 