import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { convertDateToStr } from "../service/DatetimeService";
import { WebView } from "react-native-webview";
import Label from "../components/Label";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "../components/PressableArea";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CommonStyles from "../style/CommonStyles";
import { deleteTravelDiary } from "../firebase/firebase-helper";

export default function DiaryDetail({ route, navigation }) {
  const diaryID = route.params.diaryID;

  //need realtime data, not from route
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [user, setUser] = useState("");
  const [article, setArticle] = useState("");
  const [collect, setCollect] = useState(false);

  function pressedTest() {
    setCollect(!collect);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "travelDiary", diaryID),
      (doc) => {
        if (doc) {
          setTitle(doc.data().title);
          const createdAt = doc.data().createdAt;
          const date = createdAt.toDate();
          const dateString = convertDateToStr(date);
          setCreatedAt(dateString);
          setUser("Bella");
          setArticle(
            `<html><head><style>body {font-size: 40px;}</style></head><body>${
              doc.data().article
            }</body></html>`
          );
        }
      }
    );
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (route.params.from === "me") {
      navigation.setOptions({
        headerRight: () => {
          return (
            <PressableArea
              customizedStyle={{ marginTop: 3 }}
              areaPressed={() => {
                navigation.navigate("CreateDiary", {
                  type: "edit",
                  id: diaryID,
                });
              }}
            >
              <Feather name="edit-3" size={20} color="white" />
            </PressableArea>
          );
        },
      });
    }
  }, []); // empty array here to run the effect only once

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Label content={title} customizedStyle={styles.title} />
        <View style={styles.labelContainer}>
          <View style={styles.userContainer}>
            <Image
              style={styles.image}
              source={require("../assets/scenery.jpg")} //need change
            />
            <Label content={user} customizedStyle={styles.text} />
          </View>
          <Label content={createdAt} customizedStyle={styles.text} />
          <PressableArea
            areaPressed={pressedTest}
            customizedStyle={{ alignItems: "flex-end" }}
          >
            {collect ? (
              <AntDesign name="hearto" size={22} color="grey" />
            ) : (
              <AntDesign name="heart" size={22} color="red" />
            )}
          </PressableArea>
        </View>
      </View>
      <WebView source={{ html: article }} />

      {route.params.from === "me" && (
        <View style={styles.buttonContainer}>
          <PressableArea
            customizedStyle={styles.deleteButton}
            areaPressed={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to delete this travel diary?",
                [
                  { text: "NO", onPress: () => console.log("No Pressed") },
                  {
                    text: "YES",
                    onPress: () => {
                      deleteTravelDiary(diaryID);
                      navigation.navigate("HomeTab");
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </PressableArea>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginLeft: 20,
    textAlign: "center",
    marginTop: 20,
  },

  topContainer: {
    flex: 0.3,
    justifyContent: "center",
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },

  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
    paddingTop: 25,
  },

  text: {
    fontSize: 17,
    marginLeft: 5,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  deleteButton: [
    {
      width: "50%",
      height: "40%",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#ff6347",
    },
    CommonStyles.deleteButtonBackground,
  ],

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },

  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
