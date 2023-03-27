import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

export default function Square() {
  return (
    <View>
      <View style={styles.squareItem}>
        <Text>Square</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Title for each item</Text>
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
    margin: 5,
  },
});
