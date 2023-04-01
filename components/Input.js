import { StyleSheet, View, Text, TextInput,Keyboard } from "react-native";
import React from "react";

const Input = ({ customizedStyle, value, setEnteredValue, isMultiline, placeholder }) => {
  return (
    <>
      <TextInput
        value={value}
        style={[styles.container, customizedStyle]}
        onChangeText={(changedText) => {
          setEnteredValue(changedText);
        }}
        multiline={isMultiline}
        textAlignVertical="top"
        placeholder={placeholder}
        returnKeyType="done"
        onSubmitEditing={()=>{
          Keyboard.dismiss();
        }}


      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
      width: 220,
      height: 35,
      borderRadius: 5,
      fontSize: 20,
      backgroundColor: "#fff",
      textAlign: "center",
      borderWidth: 1
    },

});
