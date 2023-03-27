import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "./PressableArea";

export default function Square({ image, title, id }) {
  const [collect, setCollect] = useState(false); //edit added
  function pressedTest() {
    setCollect(!collect);
  }

  function showDetails() {
    console.log("show details");
  }

  return (
    <View style={{ margin: 5 }}>
      <PressableArea areaPressed={showDetails}>
        <View style={styles.squareItem}>
          <Text>{image}</Text>
        </View>

        <View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.id}>{id}</Text>
            <PressableArea areaPressed={pressedTest}>
              {collect ? (
                <AntDesign name="hearto" size={22} color="grey" />
              ) : (
                <AntDesign name="heart" size={22} color="red" />
              )}
            </PressableArea>
          </View>
        </View>
      </PressableArea>
    </View>
  );
}

const styles = StyleSheet.create({
  squareItem: {
    backgroundColor: "grey",
    height: 200,
    width: Dimensions.get("window").width / 2 - 16,
    borderRadius: 5,
  },
  id: {
    fontSize: 16,
    color: "grey",
  },
  title: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
