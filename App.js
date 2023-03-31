import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useRef, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CreateDiary from "./screens/CreateDiary";
import PressableArea from "./components/PressableArea";
import CommonStyles from "./style/CommonStyles";
import Label from "./components/Label";
import { writeToDB } from "./firebase/firebase-helper";
import MeScreen from "./screens/MeScreen";
import Notification from "./screens/Notification";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import EditPlace from "./screens/EditPlace";
import AddPlace from "./screens/AddPlace";
import Collected from "./screens/Collected";
import HomeTabScreen from "./screens/HomeTabScreen";
import DiaryDetail from "./screens/DiaryDetail";
import Settings from "./screens/Settings";
import CreateItinerary from "./screens/CreateItinerary";
import Create from "./screens/Create";
import Itinerary from "./screens/Itinerary";
import DateTime from "./components/DateTime";
import PlaceAutoComplete from "./components/PlacesAutoComplete";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: CommonStyles.lightGreenBackground,
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        tabBarStyle: CommonStyles.lightGreenBackground,
        tabBarActiveTintColor: "rgb(235,187,66)",
        tabBarLabelStyle: {
          fontSize: 15,
        },
      })}
    >
      <Tab.Screen
        options={{
          headerTitle: "Travel Assistant",
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={24}
                style={[{ marginRight: 1 }, { marginTop: 8 }]}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
        }}
        name="HomeTab"
        component={HomeTabScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="heart"
                size={24}
                style={[{ marginRight: 1 }, { marginTop: 10 }]}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
        }}
        name="Collected"
        component={Collected}
      />

      <Tab.Screen
        name="Create"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="add-circle"
                style={[{ marginRight: 1 }, { marginTop: 5 }]}
                size={28}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
        }}
        component={Create}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="ios-notifications"
                size={24}
                style={[{ marginRight: 1 }, { marginTop: 8 }]}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
        }}
        name="Notification"
        component={Notification}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="user-circle-o"
                style={[{ marginRight: 1 }, { marginTop: 8 }]}
                size={24}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
        }}
        name="Me"
        component={MeScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: CommonStyles.lightGreenBackground,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DiaryDetail"
            component={DiaryDetail}
            options={{
              title: "Travel Diary",
            }}
          />

          <Stack.Screen
            name="CreateItinerary"
            component={CreateItinerary}
            options={{ title: "Create Your Itinerary" }}
          />

          <Stack.Screen name="CreateDiary" component={CreateDiary} />
          <Stack.Screen name="Itinerary" component={Itinerary} />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add A Place" }}
          />
          <Stack.Screen
            name="TimePicker"
            component={DateTime}
            options={{ title: "Set Visiting Time" }}
          />
          <Stack.Screen
            name="LocationSelector"
            component={PlaceAutoComplete}
            options={{ title: "Set Visiting Place" }}
          />
          <Stack.Screen name="Setting" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
