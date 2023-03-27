import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import EditDiary from "./screens/EditDiary";
import PressableArea from "./components/PressableArea";
import CommonStyles from "./style/CommonStyles";
import Label from "./components/Label";
import { writeToDB } from "./firebase/firebase-helper";
import * as ImagePicker from "expo-image-picker";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const richText = useRef();
  const [title, setTitle] = useState("");
  const [articleStatus, setArticleStatus] = useState("1");
  const [article, setArticle] = useState("");

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: CommonStyles.lightGreenBackground,
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        tabBarStyle: CommonStyles.lightGreenBackground,
        tabBarActiveTintColor: "rgb(235,187,66)",
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons name="add-circle" size="35" color={color}></Ionicons>
          );
        },
        headerLeft: () => (
          <Ionicons name="close-outline" size={30} color="#fff" />
        ),
        headerRight: () => (
          <PressableArea
            areaPressed={() => {
              richText.current?.dismissKeyboard();
              const replaceHTML = article.replace(/<(.|\n)*?>/g, "").trim();
              const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
              if (replaceWhiteSpace.length <= 0 || title === "" || articleStatus === "") {
                Alert.alert("Invalid input", "Please check your input values", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
                return;
              } 
              const diary = {
                title: title,
                articleStatus: articleStatus,
                article: article,
              };
             // console.log(diary);
             writeToDB(diary);
            }}
          >
            {/* <Label
              content="submit"
              customizedStyle={{ color: "#fff", fontSize: 15 }}
            /> */}
            <Ionicons name="checkmark-outline" size={30} color="#fff" />
          </PressableArea>
        ),
      })}
    >
      <Tab.Screen name="create" options={{ title: "create", headerTitle: "" }}>
        {() => (
          <EditDiary
            richText={richText}
            setTitle={setTitle}
            setArticle={setArticle}
            setArticleStatus={setArticleStatus}
            articleStatus={articleStatus}
          />
        )}
      </Tab.Screen>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
