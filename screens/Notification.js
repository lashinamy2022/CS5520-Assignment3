// import { View, Text } from 'react-native'
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

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
        renderItem={({ item }) => {
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
