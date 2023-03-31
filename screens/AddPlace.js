import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Text
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
import { deleteItineraryItemById, editItineraryItemToDB, writeItineraryItemToDB } from "../firebase/firebase-helper";
import { fetchImage } from "../service/ImageService";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { getImageURL } from "../service/ImageService";
const AddPlace = ({ navigation, route }) => {
  const [itineraryID, setItineraryID] = useState(route.params.itineraryID);
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
  const [itineraryItemID, setItineraryItemID] = useState(route.params.itineraryItemID);
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableArea areaPressed={async () => {
          //validate data
          if (datetime === '' || location === '') {
            Alert.alert(
              "Invalid input",
              "Please set visiting time or visiting location",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
          }
          //uploadImage
          
          let uri = "";
          if (imageUri && imageUri !== "") {
            uri = await fetchImage(imageUri);
          }
          //write data to db
          const item = {
            //itineraryID: itineraryID,
            time: datetime,
            img: uri,
            title: location,
            note: note,
            completed: false
          }
          if (itineraryItemID) {
            console.log(11);
            editItineraryItemToDB(itineraryID, itineraryItemID, item);
          } else {
            console.log(22);
            writeItineraryItemToDB(itineraryID, item);
          }
          navigation.navigate("Itinerary", {itineraryID: itineraryID});
        }}>
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation, datetime, location, imageUri, note]);

  useEffect(()=>{
    if (route.params.itineraryItemID) {
      const q = query(collection(firestore, "itinerary", itineraryID, "items"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc)  => {
            if (doc.id === route.params.itineraryItemID) {
              setDatetime(doc.data().time);
              setLocation(doc.data().title);
              setNote(doc.data().note);
              const uri = await getImageURL(doc.data().img);
              setImageUri(uri);
            }
          });
        }
      });
      return function cleanup() {
        unsubscribe();
      };
    }
  },[route]);

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
          navigation.navigate("LocationSelector", {});
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
          value={note}
          setEnteredValue={setNote}
          isMultiline={true}
        />
      </KeyboardAvoidingView>
     {itineraryItemID && <PressableArea 
      customizedStyle={styles.buttonContainer} 
      areaPressed={()=>{

        Alert.alert("Delete", "Are you sure you want to delete this?", [
          { text: "NO", onPress: () => console.log("No Pressed") },
          {
            text: "YES",
            onPress: () => {
              deleteItineraryItemById(itineraryID, itineraryItemID);
              navigation.navigate("Itinerary",{itineraryID: itineraryID});
            },
          },
        ]);
        


      }}>
           <Label customizedStyle={styles.buttonText} content="Delete"/>
      </PressableArea>}
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
  deleteButton: {
    width: "50%",
    height: "40%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6347",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },

  buttonContainer: {
    width: '90%',
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6347",
    alignSelf:"center",
    borderRadius: 5,
    marginTop: 10
  }
});
