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
    //
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
          <View style={styles.loginButtonView}>
            <PressableArea areaPressed={loginHandler}>
              <Text style={styles.buttonText}>Login</Text>
            </PressableArea>
          </View>
          <View style={styles.buttonView}>
            <PressableArea areaPressed={signupHandler}>
              <Text style={styles.buttonText}>Sign up</Text>
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
    borderBottomWidth: 1,
    width: 75,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  itemContainer: {
    margin: 10,
  },

  buttonText: {
    fontSize: 17,
  },

  loginButtonView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
