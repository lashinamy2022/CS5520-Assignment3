import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Square from "../components/Square";

export default function ListScreen() {
  const data = [
    {
      title: "1 Item",
      image: "11",
      id: "id11",
    },
    {
      title: "2 Item",
      image: "22",
      id: "id22",
    },
    {
      title: "3 Item",
      image: "33",
      id: "id33",
    },
    {
      title: "4 Item",
      image: "44",
      id: "id44",
    },
    {
      title: "5 Item",
      image: "55",
      id: "id55",
    },
    {
      title: "6 Item",
      image: "66",
      id: "id66",
    },
    {
      title: "7 Item",
      image: "77",
      id: "id77",
    },
    {
      title: "8 Item",
      image: "88",
      id: "id88",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Square title={item.title} image={item.image} id={item.id} />
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
