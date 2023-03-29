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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Travel Assistant</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Email</Text>
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
          <Text style={styles.text}>Password</Text>
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

        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            <PressableArea>
              <Text style={styles.text}>Login</Text>
            </PressableArea>
          </View>
          <View style={styles.buttonView}>
            <PressableArea>
              <Text style={styles.text}>Sign up</Text>
            </PressableArea>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 25,
  },

  middleContainer: {
    flex: 5,
  },

  inputContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    marginLeft: "13%",
    marginTop: 5,
  },

  input: {
    borderBottomWidth: 1,
    width: "75%",
    margin: 18,
    marginBottom: 20,
    fontSize: 18,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },

  buttonView: {
    marginTop: 15,
  },

  itemContainer: {
    margin: 10,
  },
});