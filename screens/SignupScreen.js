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

export default function TestScreen() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);

  function modalVisibleFunction() {
    setModalVisible(true);
  }

  function modalInvisibleFunction() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Travel Assistant</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.text}>Nickname</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            autoCapitalize="none"
            onChangeText={(nameInput) => {
              setNickname(nameInput);
            }}
          />
        </View>
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
        <Text style={styles.text}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            autoCapitalize="none"
            onChangeText={(newPassword) => {
              setConfirmPassword(newPassword);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            <PressableArea>
              <Text style={styles.text}>Sign Up</Text>
            </PressableArea>
          </View>
          <View style={styles.buttonView}>
            <PressableArea>
              <Text style={styles.text}>Already Registered</Text>
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
    flex: 1.3,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 25,
  },

  middleContainer: {
    flex: 4,
  },

  inputContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    marginLeft: "12%",
    marginTop: 5,
  },

  input: {
    borderBottomWidth: 1,
    width: "75%",
    margin: 10,
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
});
