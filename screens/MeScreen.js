import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";

export default function MeScreen() {
  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require("../assets/scenery.jpg")}
          />
          <Text>MeScreen</Text>
        </View>
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
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 15,
  },
});
