import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DiaryList from "../components/DiaryList";

export default function Collected() {
  return (
    <View style={styles.container}>
      <DiaryList title={"this is the collection"} from="home"/>
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
