import { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  AlertModal,
  ActivityIndicator,
  Modal,
  Text,
  Alert,
} from "react-native";
import Editor from "../components/Editor";
import Input from "../components/Input";
import PressableArea from "../components/PressableArea";
import Radio from "../components/Radio";
import CommonStyles from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import {
  updateTravelDiaryById,
  writeTravelDiaryToDB,
} from "../firebase/firebase-helper";
import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";

export default function CreateDiary({ navigation, route }) {
  const richText = useRef();
  const [title, setTitle] = useState("");
  const [articleStatus, setArticleStatus] = useState("1"); //1 for private, 2 for public
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params.type === "edit") {
      const unsubscribe = onSnapshot(
        doc(firestore, "travelDiary", route.params.id),
        (doc) => {
          if (doc) {
            setTitle(doc.data().title);
            setArticleStatus(doc.data().articleStatus);
            setArticle(doc.data().article);
            setTimeout(() => {
              richText.current?.setContentHTML(doc.data().article);
            }, 1000);
          }
        }
      );
      return function cleanup() {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <PressableArea
          areaPressed={() => {
            navigation.navigate("HomeTab");
          }}
        >
          <Ionicons name="close-outline" size={30} color="#fff" />
        </PressableArea>
      ),
      headerRight: () => (
        <PressableArea
          areaPressed={() => {
            richText.current?.dismissKeyboard();
            const replaceHTML = article.replace(/<(.|\n)*?>/g, "").trim();
            const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
            if (
              replaceWhiteSpace.length <= 0 ||
              title === "" ||
              articleStatus === ""
            ) {
              Alert.alert("Invalid input", "Please check your input values", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
              return;
            }
            
            Alert.alert("Post", "Are you sure you want to post this?", [
              { text: "NO", onPress: () => console.log("No Pressed") },
              {
                text: "YES",
                onPress: async () => {
                  setLoading(true);
                  const diary = {
                    title: title,
                    articleStatus: articleStatus,
                    article: article,
                  };
                  if (!route.params.id) {
                    await writeTravelDiaryToDB(diary);
                    navigation.navigate("HomeTab");
                  } else {
                    await updateTravelDiaryById(route.params.id, diary);
                    const params = {
                      // userPhoto: "../assets/scenery.jpg",//need change
                      userPhoto: "",
                      diaryID: route.params.id,
                    };
                    navigation.navigate("DiaryDetail", params);
                  }
                  setLoading(false);
                },
              },
            ]);
          }}
        >
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [title, articleStatus, article]);
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <PressableArea
          areaPressed={() => {
            richText.current?.dismissKeyboard();
          }}
        >
          <View>
            <Input
              placeholder="Input title here..."
              value={title}
              customizedStyle={[
                { width: "100%" },
                CommonStyles.lightGreenBorder,
              ]}
              setEnteredValue={setTitle}
            />
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Radio
              items={[
                {
                  id: "1", // acts as primary key, should be unique and non-empty string
                  label: "Private",
                  value: "1",
                  selected: articleStatus === "1",
                },
                {
                  id: "2",
                  label: "Public",
                  value: "2",
                  selected: articleStatus === "2",
                },
              ]}
              setSelectedValue={setArticleStatus}
            />
          </View>
        </PressableArea>
        <View style={{ paddingTop: 20 }}>
          <Editor richText={richText} setArticle={setArticle} />
        </View>
      </View>
      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="white" />
          <Text style={{ color: "white", marginTop: 10 }}>Loading...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: [
    {
      flex: 1,
      padding: 15,
    },
  ],
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
