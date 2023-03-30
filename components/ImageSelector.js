import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ImageSelector = ({ imageURL }) => {
  return (
    <View style={styles.container}>
      {imageURL ? (
        <Image
          source={{
            uri: imageURL,
          }}
          style={{ width: 120, height: 150 }}
        />
      ) : (
        <Ionicons name="add" size={35} color="grey"></Ionicons>
      )}
    </View>
  );
};

export default ImageSelector;
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 150,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
  },
});
