import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { auth } from "../firebase/firebase-setup";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ErrorText from "../components/ErrorText";
import { updatePassword, signOut } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function EditPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErrMessage, setPwdErrMessage] = useState("");
  const [confirmPwdErrMessage, setConfirmPwdErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const editSaveHandler = async () => {
    let flag = true;
    if (showPassword && password.length <= 8) {
      setPwdErrMessage("At least greater than 8 characters");
      flag = false;
    } else {
      setPwdErrMessage("");
    }
    if (showPassword && password !== confirmPassword) {
      setConfirmPwdErrMessage("The password doesn't match");
      flag = false;
    } else {
      setConfirmPwdErrMessage("");
    }
    if (!flag) {
      return;
    }
    console.log("Pass tests");

    try {
      //update the password
      if (showPassword) {
        await updatePassword(auth.currentUser, password);
      }
      Alert.alert(
        "Successfully",
        "Your Password Information has been updated",
        [
          {
            text: "Ok",
            onPress: () => {
              navigation.popToTop();
            },
          },
        ]
      );
      resetHandle();
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
  function resetHandle() {
    setPassword("");
    setConfirmPassword("");
    setPwdErrMessage("");
    setConfirmPwdErrMessage("");
    setShowPassword(false);
  }
  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Label content="Password" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={password}
              placeholder={showPassword ? "Password" : "*********"}
              editable={showPassword}
              style={styles.label}
              secureTextEntry={true}
              onChangeText={(numberInput) => {
                setPassword(numberInput);
              }}
            />
            <PressableArea
              areaPressed={() => {
                setShowPassword((prevShowStatus) => !prevShowStatus);
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
              placeholder={showPassword ? "Confirm" : "*********"}
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
      <View style={styles.buttonContainer}>
        <PressableArea
          areaPressed={editSaveHandler}
          customizedStyle={styles.saveButton}
        >
          <Text style={styles.text}>Save</Text>
        </PressableArea>
        <PressableArea
          areaPressed={resetHandle}
          customizedStyle={styles.saveButton}
        >
          <Text style={styles.text}>Clear</Text>
        </PressableArea>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 2,
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
    marginBottom: "5%",
    width: "70%",
  },
  buttonContainer: {
    flex: 6,
    justifyContent: "center",
  },
});
