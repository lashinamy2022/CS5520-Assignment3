import { View, Text } from "react-native";
import React from "react";
import Square from "../components/Square";

export default function ListScreen() {
  return (
    <View>
      <Text>ListScreen</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Square />
        <Square />
      </View>
    </View>
  );
}
