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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-setup";
import CommonStyles from "../style/CommonStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("signed in");
    } catch (err) {
      console.log("sign up error", err);
    }
  };

  const signupHandler = () => {
    navigation.replace("Signup");
  };

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
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(numberInput) => {
                setPassword(numberInput);
              }}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PressableArea
            areaPressed={loginHandler}
            customizedStyle={styles.buttonView}
          >
            <Text style={styles.buttonText}>Login</Text>
          </PressableArea>
          <PressableArea
            areaPressed={signupHandler}
            customizedStyle={styles.buttonView}
          >
            <Text style={styles.buttonText}>Sign up</Text>
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

  itemContainer: {
    margin: 10,
  },

  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
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
});
