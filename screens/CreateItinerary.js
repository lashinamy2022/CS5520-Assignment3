import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  Alert
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import PressableArea from "../components/PressableArea";
import { Ionicons } from "@expo/vector-icons";
import { writeItineraryToDB } from "../firebase/firebase-helper";

export default function CreateItinerary({navigation}) {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  useEffect(()=>{
    navigation.setOptions({
      headerLeft: () => (
        <PressableArea areaPressed={()=>{
          navigation.navigate("HomeTab");
        }}>
        <Ionicons name="close-outline" size={30} color="#fff" />
        </PressableArea>
      )
    });

  },[]);

  async function createButtonPressed() {
    if (name === "" || days === "") {
      Alert.alert(
        "Invalid input",
        "Please check your input values",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
    if (!days.match(/^[0-9]*$/)) {
      Alert.alert(
        "Invalid input",
        "Please enter numbers for days",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
    const itinerary = {
      name: name,
      days: days
    };
    const id = await writeItineraryToDB(itinerary);
    navigation.navigate("Itinerary", {itineraryID: id});
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
              value={name}
              autoCapitalize="none"
              onChangeText={(changedText) => {
                setName(changedText);
              }}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Days</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={days}
              autoCapitalize="none"
              onChangeText={(changedText) => {
                setDays(changedText);
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
