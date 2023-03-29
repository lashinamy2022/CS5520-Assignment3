import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import PressableArea from "../components/PressableArea";

export default function EditPlace() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.middleContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.input}>Date</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Time</Text>
          <Text style={styles.input}>Time</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableArea customizedStyle={styles.custmomizedStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </PressableArea>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  middleContainer: {
    flex: 1,
    marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    marginLeft: "15%",
    alignItems: "center",
  },

  input: {
    width: 130,
    margin: 25,
    marginLeft: 55,
    fontSize: 20,
    textDecorationLine: "underline",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginTop: 20,
    alignItems: "center",
  },

  itemContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
  },

  custmomizedStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginLeft: "10%",
    marginTop: "5%",
  },

  buttonText: {
    fontSize: 20,
    alignItems: "center",
  },
});
