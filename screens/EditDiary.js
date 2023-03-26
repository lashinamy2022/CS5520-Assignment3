import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Editor from "../components/Editor";
import Input from "../components/Input";
import Radio from "../components/Radio";
import CommonStyles from "../style/CommonStyles";

export default function EditDiary({richText, setTitle, setArticle, setArticleStatus, articleStatus}) {
 


  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
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
    padding: 25,
  }],
});
