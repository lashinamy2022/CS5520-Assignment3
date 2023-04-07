import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import CommonStyles from "../style/CommonStyles";
import { saveUserInfo } from "../firebase/firebase-helper";
import { useState } from "react";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import Input from "../components/Input";

const SetProfileNickname = ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  return (
    <View style={styles.container}>
      <Label
        content="Please set your nickname"
        customizedStyle={{ marginTop: 10, fontSize: 20 }}
      />
     <Input
          customizedStyle={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#f2f2f2",
            borderWidth: 0,
            borderBottomWidth:1,
            marginTop: 60
          }}
          setEnteredValue={setNickname}
          isMultiline={false}
        />
      <PressableArea
        areaPressed={async () => {
          if (nickname === "") {
            Alert.alert("Please enter your nickname");
            return;
          }
          setLoading(true);
          saveUserInfo({nickname: nickname});
          setLoading(false);
          navigation.navigate("Home");
        }}
        disabled={loading}
        customizedStyle={styles.pressableStyle}
      >
        <Label content="Save" customizedStyle={{ color: "white" }} />
      </PressableArea>
    </View>
  );
};

export default SetProfileNickname;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    pressableStyle: [
      CommonStyles.lightGreenBackground,
      {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "60%",
        marginTop: 90
      },
    ],
  });
