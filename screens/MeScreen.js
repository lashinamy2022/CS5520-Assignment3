import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiaryList from "../components/DiaryList";
import ItineraryList from "../components/ItineraryList";

const Tab = createMaterialTopTabNavigator();

function MyTravelDiaryList() {
  return <DiaryList title={"Travel Diary"} from="me" />;
}

function MyItineraryList() {
  return <ItineraryList title={"Itinerary"} />;
}

export default function MeScreen({}) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          // set the active tab's bottom border color to red
          tabBarActiveTintColor: "black",
          tabBarIndicatorStyle: {
            // set the height of the active tab's bottom border
            borderBottomWidth: 2,
            // set the color of the active tab's bottom border
            borderColor: "grey",
          },
        }}
      >
        <Tab.Screen name="itinerary" component={MyItineraryList} />
        <Tab.Screen name="travel diary" component={MyTravelDiaryList} />
      </Tab.Navigator>
    </View>
  );
}
