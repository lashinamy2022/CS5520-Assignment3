import { View, StyleSheet, Image } from "react-native";
import React from "react";
import PressableArea from "./PressableArea";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from "@expo/vector-icons";


const ProfilePhoto = () => {
    const options = ["Choose from gallery", "Use camera", "Cancel"];
  const cancelButtonIndex = 2;
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          console.log("use gallery");
        } else if (buttonIndex === 1) {
          console.log("use camera");
        }
      }
    );
  }
  return (
    <>
      <View style={{ marginTop: 50 }}>
        <PressableArea areaPressed={handlePress}>
          <Image
            style={styles.image}
            source={require("../assets/scenery.jpg")}
          />
        </PressableArea>
      </View>
      <View style={styles.camera}>
        <Ionicons name="camera-outline" size={15} color="white" />
      </View>
    </>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
  },
  camera: {
    position: "relative",
    top: -25,
    left: 35,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "black",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
});
