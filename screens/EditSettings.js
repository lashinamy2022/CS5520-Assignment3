import { Dimensions } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditNickName from "../components/EditNickName";
import EditPassword from "../components/EditPassword";

export default function EditSettings({ route }) {
  const height = Dimensions.get("screen").height;
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ height: height }}>
      {route.params.type === "editName" ? (
        <EditNickName nicknameOrigin={route.params.nickname} />
      ) : (
        <EditPassword />
      )}
    </KeyboardAwareScrollView>
  );
}