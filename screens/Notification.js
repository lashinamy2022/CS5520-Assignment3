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

  // const data = [
  //   {
  //     id: "id11",
  //     title: "1 Notice title",
  //     content: "1 Content",
  //   },
  //   {
  //     id: "id22",
  //     title: "2 Notice title",
  //     content: "2 Content",
  //   },
  //   {
  //     id: "id33",
  //     title: "3 Notice title",
  //     content: "3 Content",
  //   },
  //   {
  //     id: "id44",
  //     title: "4 Notice title",
  //     content: "4 Content",
  //   },
  // ];

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.item}>
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
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
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
