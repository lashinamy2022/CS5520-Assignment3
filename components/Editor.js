import { ScrollView, StyleSheet, View, Alert } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";

import CommonStyles from "../style/CommonStyles";

export default function Editor({ richText, setArticle }) {
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
  }
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
          const hasPermission = await verifyPermission();
          if (!hasPermission) {
            Alert.alert("You need to give access to the camera");
            return;
          }
          try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
              base64: false,
            });
            if (!result.canceled) {
              console.log(result.assets[0].uri);
              // richText.current?.setContentHTML(`<div><img src="data:image/jpeg;base64,${result.assets[0].base64}"/></div>`);

            }
          } catch (err) {
            console.log("launch camera error", err);
          }
        }}
      />
      <ScrollView bounces={false}>
        <RichEditor
          ref={richText}
          onChange={setArticle}
          placeholder="Write your travel diary here :)"
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          initialHeight={450}
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
