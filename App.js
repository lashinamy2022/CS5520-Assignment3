import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import EditDiary from "./screens/EditDiary";
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
import AddNewItem from "./screens/AddNewItem";
import Itinerary from "./screens/Itinerary";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [modalVisible, setModalVisible] = useState(true);

  function modalVisibleHandle(res) {
    setModalVisible(res);
  }

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
              <PressableArea
                areaPressed={() => {
                  setModalVisible(true);
                }}
              >
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
              </PressableArea>
            );
          },
        }}
      >
        {() => (
          <AddNewItem
            modalVisible={modalVisible}
            modalVisibleHandle={modalVisibleHandle}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        options={{
          headerLeft: null,
          headerRight: null,
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
  const richText = useRef();
  const [title, setTitle] = useState("");
  const [articleStatus, setArticleStatus] = useState("1");
  const [article, setArticle] = useState("");
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
            options={{ title: "Travel Diary" }}
          />
          <Stack.Screen
            name="CreateItinerary"
            component={CreateItinerary}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Itinerary"
            component={Itinerary}
            // options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="EditDiary"
            options={{
              headerLeft: () => (
                <Ionicons name="close-outline" size={30} color="#fff" />
              ),
              headerRight: () => (
                <PressableArea
                  areaPressed={() => {
                    richText.current?.dismissKeyboard();
                    const replaceHTML = article
                      .replace(/<(.|\n)*?>/g, "")
                      .trim();
                    const replaceWhiteSpace = replaceHTML
                      .replace(/&nbsp;/g, "")
                      .trim();
                    if (
                      replaceWhiteSpace.length <= 0 ||
                      title === "" ||
                      articleStatus === ""
                    ) {
                      Alert.alert(
                        "Invalid input",
                        "Please check your input values",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                      return;
                    }
                    const diary = {
                      title: title,
                      articleStatus: articleStatus,
                      article: article,
                    };
                    console.log(diary);
                    writeToDB(diary);
                  }}
                >
                  <Ionicons name="checkmark-outline" size={30} color="#fff" />
                </PressableArea>
              ),
            }}
          >
            {() => (
              <EditDiary
                richText={richText}
                setTitle={setTitle}
                setArticle={setArticle}
                setArticleStatus={setArticleStatus}
                articleStatus={articleStatus}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Setting" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
