import { StyleSheet, Pressable } from "react-native";
import React from "react";
import CommonStyles from "../style/CommonStyles";
const PressableArea = ({ areaPressed, children, customizedStyle, disabled }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={areaPressed}
      style={({ pressed }) => {
        return [customizedStyle, pressed && styles.pressedStyle];
      }}
    >
      {children}
    </Pressable>
  );
};

export default PressableArea;

const styles = StyleSheet.create({
  pressedStyle: {
    opacity: 0.5,
  },
});
