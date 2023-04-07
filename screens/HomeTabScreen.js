import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import DiaryList from "../components/DiaryList";
import { hasUserInfo } from "../firebase/firebase-helper";

export default function HomeTabScreen({navigation}) {
  
  useEffect(()=> {
    async function checkIfUserHasSetProfile() {
      const flag = await hasUserInfo();
      if (!flag) {
       navigation.navigate("SetProfilePhoto");
      }
    }
    checkIfUserHasSetProfile();
  },[]); 
  return (
    <View style={styles.container}>
      <DiaryList from="home"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
