import { FlatList, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  LayoutAnimation,
} from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";


const storageKey = "shopping-List";


type ShoppingListItemType = {
  id: string;  
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
}

 

  export default function App() {

    const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
    const [value, setValue] = useState<string>();

    useEffect(() => {
      const fetechInitial = async () => {
        const data = await getFromStorage(storageKey);
        if (data) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShoppingList(data);
        }
      }
      fetechInitial();
    }, []);
 
   const handleSubmit = () => {
     if (value) { 
       const newShoppingList = [
         { id: new Date().toISOString(), name: value, 
          lastUpdatedTimestamp: Date.now() },
         ...shoppingList,
       ];
       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
       setShoppingList(newShoppingList);
       saveToStorage(storageKey, newShoppingList);
       setValue(" ");
     }
   };

   const handleDelete = (id: string) => {
      const newShoppingList = shoppingList.filter((item) => item.id !== id);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      
   };

   const handleToggleComplete = (id: string) => {
      const newShoppingList = shoppingList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            lastUpdatedTimestamp: Date.now(),
            completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(),
          };
        }
        return item;
      });
      saveToStorage(storageKey, newShoppingList);  
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
   }
 
   return (
    <FlatList
    data={orderShoppingList (shoppingList)}
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
    renderItem={({ item }) => { return<ShoppingListItem name={item.name} 
    onDelete ={() => handleDelete(item.id) } 
    onToggleComplete={() => handleToggleComplete(item.id) }
    isCompleted={Boolean(item.completedAtTimestamp)}
    />}}

    />
   );
  }


  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }
  
      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }
  
      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }
  
      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }
  
      return 0;
    });
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
 