import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

export default function Square() {
  return (
    <View style={styles.SquareItem}>
      <Text>Square</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  SquareItem: {
    height: 300,
    width: Dimensions.get("window") / 2 - 16,
    borderRadius: 5,
    backgroundColor: "red",
  },
});
