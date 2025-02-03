import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

type props = {
    name: string;
    isCompleted?: boolean;
}

export function ShoppingListItem({ name, isCompleted }: props) {

      // Delete button Function
      const handleDelete = () => {
        Alert.alert(
            ` Are you sure you want to delete ${name}?` ,
            "It will be gone Forever",
            [
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
     <View style={[
      styles.itemContainer,
      isCompleted ? styles.completedContainer : undefined
         
     ]}>
            <Text style={[
              styles.itemText,
            isCompleted ? styles.completedText : undefined
            
            ]}>{name}</Text>
            <TouchableOpacity
             style={[
              styles.button,
              isCompleted ? styles.completedButton : undefined
             ]}
             onPress={handleDelete}
             >
         <Text style={styles.buttonText}>Delete</Text>
         </TouchableOpacity>
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
  
completedContainer: {
    backgroundColor: theme.colorLihgtGrey,
    borderBottomColor: theme.colorLihgtGrey ,
},


  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  
  },

  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },

completedButton: {
    backgroundColor: theme.colorGrey,
},

  buttonText: { 
    color: theme.colorWhite,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
 });
