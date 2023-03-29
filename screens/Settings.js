import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import PressableArea from "../components/PressableArea";

export default function Setting() {
  const [show, setShow] = useState(false);
  const handlePress = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name:</Text>
      <PressableArea areaPressed={handlePress} customizedStyle={styles.pressed}>
        <Text style={styles.pressed}>Show me</Text>
      </PressableArea>
      {show && <Text>Hi</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  name: {},

  pressed: {
    // flex: 1,
    // marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
});
