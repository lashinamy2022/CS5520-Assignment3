import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ValueDisplayView from "../components/ValueDisplayView";
import ImageSelector from "../components/ImageSelector";
import { pickPhoto } from "../service/ImageService";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";
import { writeItineraryItemToDB } from "../firebase/firebase-helper";
import { fetchImage } from "../service/ImageService";
const AddPlace = ({ navigation, route, itineraryID }) => {
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableArea areaPressed={async () => {
          //validate data
          console.log(datetime);
          console.log(location);

          if (datetime === '' || location === '') {
            Alert.alert(
              "Invalid input",
              "Please set visiting time or visiting location",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
          }
          //uploadImage
          const uri = await fetchImage(imageUri);
          //write data to db
          const item = {
            //itineraryID: itineraryID,
            time: datetime,
            img: uri,
            title: location,
            note: note,
            completed: false
          }
          writeItineraryItemToDB(item);
          navigation.navigate("itinerary");
        }}>
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation, datetime, location, imageUri, note]);

  useEffect(() => {
    if (route.params && route.params.pageName === "datetime") {
      setDatetime(`${route.params.date} ${route.params.time}`);
    } else if (route.params && route.params.pageName === "location") {
      setLocation(route.params.location);
    }
  }, [route]);
  return (
    <View>
      <Label content="Set Visiting Datetime" customizedStyle={styles.label} />
      <PressableArea
        areaPressed={() => {
          navigation.navigate("TimePicker");
        }}
      >
        <ValueDisplayView content={datetime} />
      </PressableArea>
      <Label content="Set Visiting Location" customizedStyle={styles.label} />
      <PressableArea
        areaPressed={() => {
          navigation.navigate("LocationSelector");
        }}
      >
        <ValueDisplayView content={location} />
      </PressableArea>
      <Label
        content="Select a photo"
        customizedStyle={[styles.label, { marginTop: 20 }]}
      />
      <PressableArea
        customizedStyle={{ width: 150, height: 180 }}
        areaPressed={async () => {
          const imagePath = await pickPhoto(permissionInfo, requestPermission);
          setImageUri(imagePath);
        }}
      >
        <ImageSelector imageURL={imageUri} />
      </PressableArea>
      <Label
        content="Take notes"
        customizedStyle={[styles.label, { marginTop: 20 }]}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={120}
      >
        <Input
          customizedStyle={{
            width: "90%",
            height: 120,
            alignSelf: "center",
            textAlign: "left",
            paddingLeft: 10,
            backgroundColor: "#f2f2f2"
          }}
          setEnteredValue={setNote}
          isMultiline={true}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    marginLeft: 13,
    marginTop: 40,
  },
  inputBox: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 2,
  },
});
