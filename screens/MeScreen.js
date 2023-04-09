import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import PressableArea from "../components/PressableArea";
import CommonStyles from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiaryList from "../components/DiaryList";
import ItineraryList from "../components/ItineraryList";
import { getCurrentUserInfo } from "../firebase/firebase-helper";
import { getImageURL } from "../service/ImageService";
import { useState, useEffect } from "react";
const Tab = createMaterialTopTabNavigator();

function MyTravelDiaryList() {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <DiaryList title={"Travel Diary"} from="me" />
    // </View>
  );
}

function MyItineraryList() {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ItineraryList title={"Itinerary"} />
    // </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="itinerary" component={MyItineraryList} />
      <Tab.Screen name="travel diary" component={MyTravelDiaryList} />
    </Tab.Navigator>
  );
}

export default function MeScreen({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  useEffect(() => {
    async function getSettingsInfo() {
      const user = await getCurrentUserInfo();
      if (user) {
        setNickname(user.nickname);
        if (user.photo) {
          const uri = await getImageURL(user.photo);
          setPhotoUri(uri);
        }
      }
    }

    getSettingsInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          {!photoUri ? (
            <Image
              style={styles.image}
              source={require("../assets/scenery.jpg")}
            />
          ) : (
            <Image
              source={{
                uri: photoUri,
              }}
              style={styles.image}
            />
          )}
          <Text style={styles.IDText}>{nickname}</Text>
        </View>
        <View>
          <PressableArea
            areaPressed={() => {
              navigation.navigate("Settings");
            }}
          >
            <View style={styles.settingContainer}>
              <Ionicons name="settings" size={20} color="black" />
              <Text style={styles.settingText}>Settings</Text>
            </View>
          </PressableArea>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <MyTabs />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: [
    {
      flex: 2,
      justifyContent: "space-around",
      alignItems: "center",
      // backgroundColor: "grey",
      // padding: 5,
      paddingTop: 40,
      flexDirection: "row",
    },
    CommonStyles.lightGreenBackground,
  ],
  bottomContainer: { flex: 12 },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "white",
  },
  IDText: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "white",
    width: 100,
    borderRadius: 10,
    // marginTop: 20,
  },
  settingText: {
    fontSize: 15,
  },
});
