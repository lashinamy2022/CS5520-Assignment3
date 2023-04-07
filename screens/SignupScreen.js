import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import PressableArea from "../components/PressableArea";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-setup";
import CommonStyles from "../style/CommonStyles";

export default function SignupScreen({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    if (password !== confirmPassword) {
      Alert.alert("The password don't match");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("sign up error", err);
    }
  };

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
            secureTextEntry={true}
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
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(newPassword) => {
              setConfirmPassword(newPassword);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PressableArea
            areaPressed={signupHandler}
            customizedStyle={styles.buttonView}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </PressableArea>
          <PressableArea
            areaPressed={loginHandler}
            customizedStyle={styles.buttonView}
          >
            <Text style={styles.buttonText}>Already Registered</Text>
          </PressableArea>
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
    padding: 50,
  },

  buttonView: [
    CommonStyles.lightGreenBackground,
    {
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: "100%",
      marginVertical: 10,
    },
  ],

  buttonText: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
  },
});
