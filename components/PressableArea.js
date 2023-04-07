import { StyleSheet, Pressable } from "react-native";
import React from "react";
import CommonStyles from "../style/CommonStyles";

const PressableArea = ({ areaPressed, children, customizedStyle }) => {
  return (
    <Pressable
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
    backgroundColor: CommonStyles.pressed,
    opacity: 0.8,
  },
});
