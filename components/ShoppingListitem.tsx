import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from "@expo/vector-icons/Entypo";




type props = {
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleComplete : () => void;
}

export function ShoppingListItem({ name, isCompleted,onDelete, onToggleComplete }: props) {

      // Delete button Function
      const handleDelete = () => {
        Alert.alert(
            ` Are you sure you want to delete ${name}?` ,
            "It will be gone Forever",
            [
          {
            text: "yes",
            onPress: () => onDelete(),
            style: "destructive",
          },
          {
            text: "cancel", 
            style: "cancel",
          },
        ]);
      };

  return (
     <Pressable style={[
      styles.itemContainer,
      isCompleted ? styles.completedContainer : undefined
         
     ]}
     onPress={onToggleComplete}
     >
            <View style={styles.row}>
              <Entypo name={isCompleted ? "check" : "circle"} size={24} color={theme.colorCerulean} />
              <Text style={[
                styles.itemText,
                isCompleted ? styles.completedText : undefined
              ]}>
                {name}
              </Text>
            </View>


            <TouchableOpacity onPress={handleDelete}>
         <AntDesign name="closecircle" size={24} 
         color={isCompleted ? theme.colorGrey : theme.colorRed } />
         </TouchableOpacity>
           </Pressable>
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
    paddingHorizontal: 18,
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
    marginLeft: 8,
    flex: 1,
  },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  
  },
  
  row :{
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
      
  },


 });
