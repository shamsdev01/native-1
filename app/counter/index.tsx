import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";


const timestamp = Date.now() + 10 * 1000;

type CountdownStatus={
  isOverdue : boolean;
  distance : Duration;
}

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({ 
    isOverdue: false,
    distance: {  },
  });
 
    // console.log(status);

   useEffect( () => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
    
           const distance = intervalToDuration(
             isOverdue
               ? { end: Date.now(), start: timestamp }
               : { start: Date.now(), end: timestamp },
           );
    
           setStatus({ isOverdue, distance });
          }, 1000);

          return () => {
            clearInterval(intervalId);
          }
   }, []);


  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
   if (result === "granted") {
      await Notifications.scheduleNotificationAsync({

        content: {
          title: "This is a scheduled notification",
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
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        {/* <Text style={styles.buttonText}>Schedule notification</Text> */}
        <Text style={styles.buttonText}>I've done the thing!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "theme.colorWhite",
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
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorBlack,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
