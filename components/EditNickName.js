import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ErrorText from "../components/ErrorText";
import { saveUserInfo } from "../firebase/firebase-helper";
import { useNavigation } from "@react-navigation/native";

export default function EditNickName({ nicknameOrigin }) {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState(nicknameOrigin);
  const [nameErrMessage, setNameErrMessage] = useState("");

  const editSaveHandler = async () => {
    if (nickname.length <= 0) {
      setNameErrMessage("Nickname cannot be empty");
      return;
    }
    try {
      saveUserInfo({ nickname: nickname });
      Alert.alert(
        "Successfully",
        "Your nickname information has been updated",
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
      console.log(err);
    }
  };

  function resetHandle() {
    setNickname("");
    setNameErrMessage("");
  }

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Label content="Nickname" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Nick Name"
              value={nickname}
              style={styles.label}
              onChangeText={(changedText) => {
                setNickname(changedText);
              }}
            />
          </View>
        </View>
        {nameErrMessage !== "" && <ErrorText message={nameErrMessage} />}
      </View>
      <View style={styles.buttonContainer}>
        <PressableArea
          areaPressed={editSaveHandler}
          customizedStyle={styles.Button}
        >
          <Text style={styles.text}>Save</Text>
        </PressableArea>
        <PressableArea
          areaPressed={resetHandle}
          customizedStyle={styles.Button}
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
  Button: {
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
