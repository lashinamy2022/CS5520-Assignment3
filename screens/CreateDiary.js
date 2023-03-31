import { useRef, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import Editor from "../components/Editor";
import Input from "../components/Input";
import PressableArea from "../components/PressableArea";
import Radio from "../components/Radio";
import CommonStyles from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import { writeTravelDiaryToDB } from "../firebase/firebase-helper";

export default function CreateDiary({navigation}) {
  const richText = useRef();
  const [title, setTitle] = useState("");
  const [articleStatus, setArticleStatus] = useState("1");
  const [article, setArticle] = useState("");
  useEffect(()=>{
    navigation.setOptions({
      headerLeft: () => (
        <PressableArea areaPressed={()=>{
          navigation.navigate("HomeTab");
        }}>
          <Ionicons name="close-outline" size={30} color="#fff" />
        </PressableArea>
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
                    article: article
                  };
                  writeTravelDiaryToDB(diary);
                  navigation.navigate("HomeTab");
                },
              },
            ]);
          }}
        >
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      )
    });

  },[title, articleStatus, article]);
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <PressableArea areaPressed={()=>{
           richText.current?.dismissKeyboard();
        }}>
        <View>
          <Input
            placeholder="Input title here..."
            customizedStyle={[{ width: "100%" }, CommonStyles.lightGreenBorder]}
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
                selected: articleStatus === "1"
              },
              {
                id: "2",
                label: "Public",
                value: "2",
                selected: articleStatus === "2"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: [{
    flex: 1,
    padding: 15,
  }],
});