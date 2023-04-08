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
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./firebase/firebase-setup";
import { useEffect } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { doc, getDoc } from "firebase/firestore";
import SetProfilePhoto from "./screens/SetProfilePhoto";
import SetProfileNickname from "./screens/SetProfileNickname";
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

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
          height: "30%",
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
                // style={{ marginRight: 1, marginTop: 8 }}
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
                style={{ marginTop: 2 }}
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
                style={{ marginTop: 2 }}
                size={32}
                color={
                  focused
                    ? CommonStyles.yellowActiveTab
                    : CommonStyles.greyInactiveTab
                }
              />
            );
          },
          tabBarLabel: "Create",
        }}
        component={Create}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="ios-notifications"
                size={27}
                style={{ marginTop: 2 }}
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
                // style={[{ marginRight: 1 }, { marginTop: 8 }]}
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

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </>
);

const AppStack = (
  <>
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
      options={{ title: "" }}
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
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen
      name="SetProfilePhoto"
      component={SetProfilePhoto}
      options={{ title: "", headerBackVisible: false }}
    />
    <Stack.Screen
      name="SetProfileNickname"
      component={SetProfileNickname}
      options={{ title: "", headerBackVisible: false }}
    />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            initialRouteName: "Signup",
            headerStyle: CommonStyles.lightGreenBackground,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        >
          {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}
