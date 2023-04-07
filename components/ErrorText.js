import { StyleSheet, View, Text } from "react-native";
import React from "react";

const ErrorText = ({ message }) => {
  return (
    <>
      <Text style={styles.error}>{message}</Text>
    </>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  error: {
    color: "red"
  },
});
