// import { View, Text } from 'react-native'
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import PressableArea from "../components/PressableArea";

export default function Notification() {
  const data = [
    {
      id: "id11",
      title: "1 Notice title",
      content: "1 Content",
    },
    {
      id: "id22",
      title: "2 Notice title",
      content: "2 Content",
    },
    {
      id: "id33",
      title: "3 Notice title",
      content: "3 Content",
    },
    {
      id: "id44",
      title: "4 Notice title",
      content: "4 Content",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.contentText}>{item.content}</Text>
            </View>
            <PressableArea>
              <MaterialIcons name="delete" size={24} color="black" />
            </PressableArea>
          </View>
          //   <Card customizedStyle={styles.item}>
          //     <Text style={styles.titleText}>{item.title}</Text>
          //     <Text style={styles.contentText}>{item.content}</Text>
          //   </Card>
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
  },
});
