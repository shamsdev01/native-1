import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
    

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
   if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "This is a scheduled notification",
          body: "it will appear in 5 seconds",
          sound:"default",
        },
       trigger:{
          seconds: 5,
          
       },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to Schedule Permission",
          "Please enable notifications in your settings",
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
       style={styles.button}
       onPress={scheduleNotification}
       activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          Schedule Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 24,
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
});
