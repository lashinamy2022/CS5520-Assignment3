import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import PressableArea from "../components/PressableArea";

export default function MeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require("../assets/scenery.jpg")}
          />
          <Text style={styles.IDText}>MeScreen</Text>
        </View>
        <PressableArea>
          <Text>Setting</Text>
        </PressableArea>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height / 3,
    backgroundColor: "grey",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 15,
  },
  IDText: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
});
