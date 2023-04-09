import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-setup";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ErrorText from "../components/ErrorText";
import { updatePassword, signOut } from "firebase/auth";
import { saveUserInfo } from "../firebase/firebase-helper";
import { Entypo } from "@expo/vector-icons";

export default function EditSettings({ route, navigation }) {
  const [nickname, setNickname] = useState(route.params.nickname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErrMessage, setPwdErrMessage] = useState("");
  const [confirmPwdErrMessage, setConfirmPwdErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function resetHandle() {
    setNickname("");
    setPassword("");
    setConfirmPassword("");
    setPwdErrMessage("");
    setConfirmPwdErrMessage("");
  }

  const editSaveHandler = async () => {
    // console.log("000");
    let flag = true;
    if (showPassword && password.length > 0 && password.length <= 8) {
      //   console.log("111");
      setPwdErrMessage("At least greater than 8 characters");
      flag = false;
    } else {
      //   console.log("222");
      setPwdErrMessage("");
    }
    if (showPassword && password !== confirmPassword) {
      //   console.log("333");
      setConfirmPwdErrMessage("The password doesn't match");
      flag = false;
    } else {
      //   console.log("444");
      setConfirmPwdErrMessage("");
    }
    if (!flag) {
      //   console.log("555");
      return;
    }

    try {
      //update the password
      //   console.log("666");
      if (showPassword) {
        await updatePassword(auth.currentUser, password);
      }
      //update the nick name
      saveUserInfo({ nickname: nickname });
      // updateUserInfo({ nickname: nickname });
      //navigate back to the settings screen
      Alert.alert("Successfully", "Your information has been updated", [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("Settings");
          },
        },
      ]);
      console.log("save successfully");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        Alert.alert(
          "Expiration",
          "Your credentials have expired and you need to sign in again to change the password",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                signOut(auth);
              },
            },
          ]
        );
      }
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Label content="Nickname" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Nick name"
              value={nickname}
              style={styles.label}
              onChangeText={(changedText) => {
                setNickname(changedText);
              }}
            />
          </View>
        </View>

        <View style={styles.infoRow}>
          <View>
            <Label content="Password" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={password}
              placeholder={showPassword ? "Password Reset" : "*********"}
              editable={showPassword}
              style={styles.label}
              secureTextEntry={true}
              onChangeText={(numberInput) => {
                setPassword(numberInput);
              }}
            />
            <PressableArea
              areaPressed={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={22}
                color="black"
                style={{ marginTop: 10 }}
              />
            </PressableArea>
          </View>
        </View>
        {pwdErrMessage !== "" && <ErrorText message={pwdErrMessage} />}

        <View style={styles.infoRow}>
          <View>
            <Label content="Confirm Password" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={confirmPassword}
              placeholder={showPassword ? "Confirm Password" : "*********"}
              editable={showPassword}
              style={styles.label}
              secureTextEntry={true}
              onChangeText={(numberInput) => {
                setConfirmPassword(numberInput);
              }}
            />
            <PressableArea
              areaPressed={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={22}
                color="black"
                style={{ marginTop: 10 }}
              />
            </PressableArea>
          </View>
        </View>
        {confirmPwdErrMessage !== "" && (
          <ErrorText message={confirmPwdErrMessage} />
        )}
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <PressableArea
          areaPressed={resetHandle}
          customizedStyle={styles.saveButton}
        >
          <Text style={styles.text}>Reset</Text>
        </PressableArea>
        <PressableArea
          areaPressed={editSaveHandler}
          customizedStyle={styles.saveButton}
        >
          <Text style={styles.text}>Save</Text>
        </PressableArea>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  label: {
    padding: 15,
    fontSize: 16,
    fontWeight: "normal",
  },
  saveButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    alignItems: "center",
    padding: 5,
    marginLeft: "15%",
    marginBottom: "12%",
    width: "70%",
  },
});
