import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SquareList from "../components/SquareList";

export default function Collected() {
  return (
    <View style={styles.container}>
      <SquareList title={"this is the collection"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
