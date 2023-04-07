import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-setup";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ProfilePhoto from "../components/ProfilePhoto";
import { Ionicons } from "@expo/vector-icons";

const Setting = ({ navigation }) => {
  

  return (
    <>
      <View style={styles.imageContainer}>
        <ProfilePhoto/>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Label content="Nickname" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Label content="" customizedStyle={styles.label} />
            <Ionicons
              name="pencil-outline"
              size={20}
              color="gray"
              style={{ paddingTop: 14 }}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View>
            <Label content="Password" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Label content="" customizedStyle={styles.label} />
            <Ionicons
              name="pencil-outline"
              size={20}
              color="gray"
              style={{ paddingTop: 14 }}
            ></Ionicons>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <PressableArea
          areaPressed={() => {
            signOut(auth);
          }}
          customizedStyle={styles.signoutButton}
        >
          <Text style={styles.text}>Sign out</Text>
        </PressableArea>
      </View>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
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
  infoContainer: {
    flex: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  label: {
    padding: 15,
    fontSize: 16,
    fontWeight: "normal",
  },
  signoutButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    alignItems: "center",
    padding: 5,
    marginLeft: "15%",
    marginBottom: "12%",
    width: "70%",
  },
});
