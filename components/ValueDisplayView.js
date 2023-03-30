import { View, Text, StyleSheet } from "react-native";
import React from "react";
const ValueDisplayView = ({content}) => {
  return (
    <View style={styles.inputBox}>
      <Text style={{fontSize: 20}}>{content}</Text>
    </View>
  );
};

export default ValueDisplayView;
const styles = StyleSheet.create({
  inputBox: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "grey",
    justifyContent:"flex-end"
  },
});
