import { ScrollView, StyleSheet, View, Alert } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import CommonStyles from "../style/CommonStyles";
import { pickPhoto, fetchImage, getImageURL } from "../service/ImageService";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";

export default function Editor({ richText, setArticle, routeType, id }) {
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (routeType === "edit") {
      const unsubscribe = onSnapshot(
        doc(firestore, "travelDiary", id),
        (doc) => {
          if (doc) {
            console.log("doc.data", doc.data());
            setContent(doc.data().article);
          }
        }
      );
      return function cleanup() {
        unsubscribe();
      };
    }
  }, []);


  useEffect(() => {
    if (routeType === "edit") {
      // setContent(initialHTML);
      // console.log(content);
    }
  }, []);
  const value =
    "<html><head><style>body {font-size: 24px;></style></head><body><p>This is some HTML content!</p></body></html>";

export default function Editor({ richText, setArticle }) {
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
  const [content, setContent] = useState("");
  const value = "";

  return (
    <View>
      <RichToolbar
        editor={richText}
        selectedIconTint="#873c1e"
        iconTint="#312921"
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.setUnderline,
          actions.alignCenter,
          actions.alignLeft,
          actions.alignRight,
        ]}
        style={styles.richTextToolbarStyle}
        onPressAddImage={async () => {
          const imageUri = await pickPhoto(permissionInfo, requestPermission);
          if (!imageUri || imageUri === "") {
            return;
          }
          const filePath = await fetchImage(imageUri);
          getImageURL(filePath)
            .then((url) => {
              setArticle(
                content +
                  '<div><img src="' +
                  url +
                  '" style="width: 100%"/></div>'
              );
              richText.current?.setContentHTML(
                content +
                  '<div><img src="' +
                  url +
                  '" style="width: 100%"/></div>'
              );
            })
            .catch((error) => {
              console.log("Image Url error", error);
            });
        }}
      />
      <ScrollView bounces={false}>
        <RichEditor

          // html={initialHTML}
          initialContentHTML={content}
          ref={richText}
          onChange={(html) => {

          ref={richText}
          html={value}
          onChange={(html)=>{

            setArticle(html);
            setContent(html);
          }}
          placeholder="Write your travel diary here :)"
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          initialHeight={1000}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  richTextEditorStyle: [
    {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      fontSize: 20,
    },
    CommonStyles.lightGreenBorder,
  ],

  richTextToolbarStyle: [
    {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
    },
    CommonStyles.lightGreenBackground,
    CommonStyles.lightGreenBorder,
  ],
});
