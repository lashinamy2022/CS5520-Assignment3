import { View, StyleSheet } from "react-native";
import React from "react";
import ProfilePhoto from "../components/ProfilePhoto";
import Label from "../components/Label";
import { useEffect } from "react";
import PressableArea from "../components/PressableArea";
import CommonStyles from "../style/CommonStyles";
const SetProfilePhoto = ({navigation}) => {
 
  return (
    <View style={styles.container}>
      <Label content="Please set your profile photo" customizedStyle={{marginTop: 10, fontSize: 20}}/>
      <ProfilePhoto />
      
    </View>
  );
};

export default SetProfilePhoto;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
});
