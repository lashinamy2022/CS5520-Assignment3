// import { View, Text } from 'react-native'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import PressableArea from "../components/PressableArea";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  if (permissionResponse.granted) {
    return true;
  }
  console.log(permissionResponse);
  try {
    const permissionResult = await Notifications.requestPermissionsAsync();
    return permissionResult.granted;
  } catch (err) {
    console.log("permission", err);
  }
}

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give notification permission");
    } else {
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();
      setNotifications(scheduledNotifications);
    }
  };

  async function scheduleNotificationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give notification permission");
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Your trip is in 3 days",
          body: "check my itinerary",
          data: { url: "https://google.com" },
        },
        trigger: { second: 1 },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <PressableArea customizedStyle={styles.item}>
            <View>
              <Text style={styles.titleText}>{item.content.title}</Text>
              <Text style={styles.contentText}>{item.content.body}</Text>
            </View>
            <PressableArea
              areaPressed={() => {
                const newNotifications = notifications.filter(
                  (notification) => notification.identifier !== item.identifier
                );
                setNotifications(newNotifications);
              }}
              customizedStyle={{ marginRight: 20 }}
            >
              <MaterialIcons name="delete" size={24} color="black" />
            </PressableArea>
          </PressableArea>
        )}
      />
      <Button
        title={"schedule a notification"}
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="View Scheduled Notifications"
        onPress={() => getNotifications()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 15,
    fontWeight: "300",
  },
  item: {
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    padding: 10,
    margin: 10,
    width: 380,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
