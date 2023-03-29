import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import EditDiary from "./screens/EditDiary";
import PressableArea from "./components/PressableArea";
import CommonStyles from "./style/CommonStyles";
import { writeTravelDiaryToDB } from "./firebase/firebase-helper";
import Itinerary from "./screens/Itinerary";
import AddPlace from "./screens/AddPlace";
import DateTime from "./components/DateTime";
import PlacesAutoComplete from "./components/PlacesAutoComplete";

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
      })}
    >
      <Tab.Screen
        name="create"
        options={{
          title: "create",
          headerTitle: "",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="add-circle" size={35} color={color}></Ionicons>
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
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                  );
                  return;
                }
                Alert.alert("Post", "Are you sure you want to post this?", [
                  { text: "NO", onPress: () => console.log("No Pressed") },
                  {
                    text: "YES",
                    onPress: () => {
                      const diary = {
                        title: title,
                        articleStatus: articleStatus,
                        article: article,
                        createAt: new Date(),
                        updateAt: new Date(),
                      };
                      writeTravelDiaryToDB(diary);
                    },
                  },
                ]);
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
      </Tab.Screen>
      <Tab.Screen
        name="itinerary"
        options={{
          title: "itinerary",
          headerTitle: "",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="cafe" size={35} color={color}></Ionicons>;
          }
        }}
        component={Itinerary}
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
            name="TimePicker"
            component={DateTime}
            options={{ title: "Select Visiting Datetime", headerShown: true}}
          />
           <Stack.Screen
            name="LocationSelector"
            component={PlacesAutoComplete}
            options={{ title: "Select A Visiting Location", headerShown: true}}
          />

          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a place ", headerShown: true}}
          />  

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
