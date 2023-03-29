import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import PressableArea from "../components/PressableArea";
import CommonStyles from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SquareList from "../components/SquareList";

const Tab = createMaterialTopTabNavigator();

function TravelDiaryList() {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <SquareList title={"Travel Diary"} />
    // </View>
  );
}

function ItineraryList() {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <SquareList title={"Itinerary"} />
    // </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="diary" component={TravelDiaryList} />
      <Tab.Screen name="itinerary" component={ItineraryList} />
    </Tab.Navigator>
  );
}

export default function MeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require("../assets/scenery.jpg")}
          />
          <Text style={styles.IDText}>MeScreen</Text>
        </View>
        <View>
          <PressableArea>
            <View style={styles.settingContainer}>
              <Ionicons name="settings" size={20} color="black" />
              <Text style={styles.settingText}>Setting</Text>
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
