import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";
import { useState } from "react";
import PressableArea from "../components/PressableArea";

export default function EditItinerary() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.middleContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Date</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              autoCapitalize="none"
              onChangeText={(emailInput) => {
                setEmail(emailInput);
              }}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Time</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              autoCapitalize="none"
              onChangeText={(numberInput) => {
                setPassword(numberInput);
              }}
            />
          </View>
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
  },

  text: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 10,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    width: 130,
    margin: 25,
    marginBottom: 20,
    fontSize: 18,
  },

  buttonContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginTop: 20,
  },

  itemContainer: {
    flexDirection: "row",
    margin: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "15%",
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
