import { View, StyleSheet, Image } from "react-native";
import React from "react";
import PressableArea from "./PressableArea";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { pickPhoto, takePhoto, fetchImage } from "../service/ImageService";
import { saveUserInfo } from "../firebase/firebase-helper";

const ProfilePhoto = ({photoUri}) => {
  console.log("photoUri: ", photoUri);
  const options = ["Choose from gallery", "Use camera", "Cancel"];
  const cancelButtonIndex = 2;
  const { showActionSheetWithOptions } = useActionSheet();
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(photoUri);
  console.log("imageUri: ", imageUri);

  const handlePress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        let imagePath = "";
        if (buttonIndex === 0) {
          imagePath = await pickPhoto(permissionInfo, requestPermission);
        } else if (buttonIndex === 1) {
          imagePath = await takePhoto(permissionInfo, requestPermission);
        }
        setImageUri(imagePath);
        if (imagePath && imagePath !== "") {
          const uri = await fetchImage(imagePath);
          saveUserInfo({ photo: uri });
        }
      }
    );
  };
  return (
    <>
      <View style={{ marginTop: 50 }}>
        <PressableArea areaPressed={handlePress}>
          {!imageUri ? (
            <Image
              style={styles.image}
              source={require("../assets/scenery.jpg")}
            />
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            />
          )}
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
