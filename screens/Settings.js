import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-setup";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ProfilePhoto from "../components/ProfilePhoto";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUserInfo, getUserInfo } from "../firebase/firebase-helper";
import { getImageURL } from "../service/ImageService";
import { useIsFocused } from "@react-navigation/native";

const Setting = ({ navigation }) => {
  const isFocused = useIsFocused("");
  const [nickname, setNickname] = useState("");
  const [photoUri, setPhotoUri] = useState("");

  async function getSettingsInfo() {
    const user = await getCurrentUserInfo();
    // console.log("userInfo in settings", user);
    if (user) {
      setNickname(user.nickname);
      if (user.photo) {
        // console.log(user.photo);
        const uri = await getImageURL(user.photo);
        // console.log("uri", uri);
        setPhotoUri(uri);
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      getSettingsInfo();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.imageContainer}>
        {photoUri && <ProfilePhoto photoUri={photoUri} />}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View>
            <Label content="Nickname" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Label content={nickname} customizedStyle={styles.label} />
            <PressableArea
              areaPressed={() => {
                navigation.navigate("EditSettings", {
                  nickname: nickname,
                });
              }}
            >
              <Ionicons
                name="pencil-outline"
                size={20}
                color="gray"
                style={{ paddingTop: 14, paddingRight: 10 }}
              />
            </PressableArea>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View>
            <Label content="Password" customizedStyle={styles.label} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Label content="*******" customizedStyle={styles.label} />
            <PressableArea
              areaPressed={() => {
                navigation.navigate("EditSettings", {
                  nickname: nickname,
                });
              }}
            >
              <Ionicons
                name="pencil-outline"
                size={20}
                color="gray"
                style={{ paddingTop: 14, paddingRight: 10 }}
              />
            </PressableArea>
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
