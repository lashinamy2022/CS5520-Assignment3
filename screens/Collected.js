import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DiaryList from "../components/DiaryList";

export default function Collected() {

  return (
    <View style={styles.container}>
      <DiaryList from="collected" />
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
