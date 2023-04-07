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
import { saveUserInfo } from "../firebase/firebase-helper";
import ErrorText from "../components/ErrorText";

export default function SignupScreen({ navigation }) {
  // const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [pwdErrMessage, setPwdErrMessage] = useState("");
  const [confirmPwdErrMessage, setConfirmPwdErrMessage] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    let emailReg =
      /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
    let flag = true;
    if (!emailReg.test(email)) {
      setEmailErrMessage("Invalid email address");
      flag = false;
    } else {
      setEmailErrMessage("");
    }
    if (password.length <= 8) {
      setPwdErrMessage("At least greater than 8 characters");
      flag = false;
    } else {
      setPwdErrMessage("");
    }
    if (password !== confirmPassword) {
      setConfirmPwdErrMessage("The password doesn't match");
      flag = false;
    } else {
      setConfirmPwdErrMessage("");
    }
    if (!flag) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // saveUserInfo({ nickname: nickname });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Alert.alert("This email has been used!");
      }
      console.log(err.code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Travel Assistant</Text>
      </View>
      <View style={styles.middleContainer}>
        {/* <Text style={styles.text}>Nickname</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            autoCapitalize="none"
            onChangeText={(nameInput) => {
              setNickname(nameInput);
            }}
          />
        </View> */}
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
          <ErrorText message={emailErrMessage} />
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
          <ErrorText message={pwdErrMessage} />
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
          <ErrorText message={confirmPwdErrMessage} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.signupButton}>
            <PressableArea areaPressed={signupHandler}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </PressableArea>
          </View>
          <View style={styles.buttonView}>
            <PressableArea areaPressed={loginHandler}>
              <Text style={styles.buttonText}>Already Registered</Text>
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
    padding: 50,
  },
  buttonView: {
    marginTop: 25,
    borderBottomWidth: 1,
    width: 180,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  signupButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
    marginRight: 5,
    padding: 5,
  },

  buttonText: {
    fontSize: 17,
  },
});
