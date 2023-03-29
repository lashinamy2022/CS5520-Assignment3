import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import Square from "../components/Square";

export default function SquareList({ title }) {
  const data = [
    {
      title: "1 Item",
      image: "11",
      id: "id11",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "2 Item",
      image: "22",
      id: "id22",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "3 Item",
      image: "33",
      id: "id33",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "4 Item",
      image: "44",
      id: "id44",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "5 Item",
      image: "55",
      id: "id55",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "6 Item",
      image: "66",
      id: "id66",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "7 Item",
      image: "77",
      id: "id77",
      uaserPhoto: "../assets/scenery.jpg",
    },
    {
      title: "8 Item",
      image: "88",
      id: "id88",
      uaserPhoto: "../assets/scenery.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {title && <Text>Title is {title}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Square
            title={item.title}
            image={item.image}
            id={item.id}
            userPhoto={item.uaserPhoto}
          />
        )}
        numColumns={2}
      />
      {/* <View style={{ margin: 20 }}>
          <Image
            style={{ borderRadius: 50 }}
            source={require("../assets/scenery.jpg")}
          />
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
