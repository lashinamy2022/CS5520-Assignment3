import { Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase/firebase-setup";

export const verifyPermission = async (permissionInfo, requestPermission) => {
  if (permissionInfo.granted) {
    return true;
  }
  const permissionResult = await requestPermission();
  return permissionResult.granted;
};

export const takePhoto = async (permissionInfo, requestPermission) => {
  const hasPermission = await verifyPermission(permissionInfo, requestPermission);
  if (!hasPermission) {
    Alert.alert("You need to give access to the camera");
    return;
  }
  try {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.2,
    });
    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return "";
  } catch (err) {
    console.log("launch camera error", err);
  }
};

export const pickPhoto = async (permissionInfo, requestPermission) => {
  const hasPermission = await verifyPermission(permissionInfo, requestPermission);
  if (!hasPermission) {
    Alert.alert("You need to give access to the gallery");
    return;
  }
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return "";
  } catch (err) {
    console.log("launch gallery error", err);
  }
};

export const fetchImage = async (uri) => {
  if (!uri || uri === "") {
    return;
  }
  try {
    const response = await fetch(uri);
    const imageBlog = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, imageBlog);
    console.log(uploadResult.metadata.fullPath);
    return uploadResult.metadata.fullPath;
  } catch (err) {
    console.log(err);
  }
};

export const getImageURL = async (uri) => {
  if (!uri || uri === "") {
    return;
  }
  const storageRef = ref(storage, uri);
  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("getImageErr", error);
  }
};
