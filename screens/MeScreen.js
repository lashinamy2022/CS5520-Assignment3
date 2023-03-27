import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import PressableArea from "../components/PressableArea";
import CommonStyles from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";

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
          <View style={styles.settingContainer}>
            <Ionicons name="settings" size={20} color="black" />
            <Text style={styles.settingText}>Setting</Text>
          </View>
        </PressableArea>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height / 4,
    backgroundColor: "grey",
    padding: 10,
    paddingTop: 40,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "white",
  },
  IDText: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "white",
    width: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  settingText: {
    fontSize: 15,
  },
});
