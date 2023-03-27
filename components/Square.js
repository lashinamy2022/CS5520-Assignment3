import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "./PressableArea";

export default function Square({ image, title }) {
  const [collect, setCollect] = useState(false); //edit added
  function pressedTest() {
    setCollect(!collect);
  }

  return (
    <View>
      <View style={styles.squareItem}>
        <Text>{image}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
        <PressableArea
          areaPressed={pressedTest}
          customizedStyle={{ marginLeft: 5 }}
        >
          {collect ? (
            <AntDesign name="hearto" size={22} color="grey" />
          ) : (
            <AntDesign name="heart" size={22} color="red" />
          )}
        </PressableArea>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  squareItem: {
    backgroundColor: "red",
    height: 200,
    width: Dimensions.get("window").width / 2 - 16,
    borderRadius: 5,
    margin: 8,
  },
  title: {
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
});
