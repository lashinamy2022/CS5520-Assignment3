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
import { useNavigation } from "@react-navigation/native";

export default function CreateItinerary() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  function createButtonPressed() {
    navigation.navigate("Itinerary");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.middleContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Itinerary Name</Text>
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
          <Text style={styles.text}>Days</Text>
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
        <PressableArea
          areaPressed={createButtonPressed}
          customizedStyle={styles.custmomizedStyle}
        >
          <Text style={styles.buttonText}>Create</Text>
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
    marginTop: "20%",
    justifyContent: "center",
  },

  inputContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 5,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    width: "75%",
    margin: 25,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginTop: 20,
  },

  itemContainer: {
    margin: 18,
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
