import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Text,
  ScrollView,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Label from "../components/Label";
import PressableArea from "../components/PressableArea";
import ValueDisplayView from "../components/ValueDisplayView";
import ImageSelector from "../components/ImageSelector";
import { pickPhoto } from "../service/ImageService";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";
import {
  deleteItineraryItemById,
  editItineraryItemToDB,
  writeItineraryItemToDB,
} from "../firebase/firebase-helper";
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
import { MAPS_API_KEY } from "@env";
import { locateUser } from "../service/MapService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddPlace = ({ navigation, route }) => {
  const [itineraryID, setItineraryID] = useState(route.params.itineraryID);
  const [imagePermission, requestImagePermission] =
    ImagePicker.useCameraPermissions();
  const [itineraryItemID, setItineraryItemID] = useState(
    route.params.itineraryItemID
  );
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function locate() {
      try {
        const coords = await locateUser(
          locationPermission,
          requestLocationPermission
        );
        //console.log(coords);
        setUserLocation(coords);
      } catch (err) {
        console.log("location err", err);
      }
    }
    locate();
  }, [locationPermission]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableArea
          areaPressed={async () => {
            //validate data
            if (datetime === "" || location === "") {
              Alert.alert(
                "Invalid input",
                "Please set visiting time or visiting location",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
              );
              return;
            }
            setLoading(true);
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
              lat: lat,
              lng: lng,
              completed: false,
              note: note,
            };

            if (itineraryItemID) {
              console.log(11);
              await editItineraryItemToDB(itineraryID, itineraryItemID, item);
            } else {
              console.log(22);
              await writeItineraryItemToDB(itineraryID, item);
            }
            setLoading(false);
            navigation.navigate("Itinerary", { itineraryID: itineraryID });
          }}
        >
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation, datetime, location, imageUri, note]);

  useEffect(() => {
    if (route.params.itineraryItemID) {
      const q = query(collection(firestore, "itinerary", itineraryID, "items"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            if (doc.id === route.params.itineraryItemID) {
              setDatetime(doc.data().time);
              setLocation(doc.data().title);
              setLat(doc.data().lat);
              setLng(doc.data().lng);
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
  }, [route]);

  useEffect(() => {
    if (route.params && route.params.pageName === "datetime") {
      setDatetime(`${route.params.date} ${route.params.time}`);
    } else if (route.params && route.params.pageName === "location") {
      setLocation(route.params.location);
      setLat(route.params.lat);
      setLng(route.params.lng);
    }
  }, [route]);
  return (
    <KeyboardAwareScrollView>
      <View style={{ padding: 10 }}>
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
        <PressableArea
          areaPressed={() => {
            Alert.alert(
              "Post",
              "Do you want to open the location in google map?",
              [
                { text: "NO", onPress: () => console.log("No Pressed") },
                {
                  text: "YES",
                  onPress: () => {
                    const uri = `https://maps.google.com/?q=${location}&dirflg=r`;
                    Linking.openURL(uri);
                  },
                },
              ]
            );
          }}
        >
          {location !== "" && userLocation && (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=10&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${userLocation.latitude},${userLocation.longitude}%7Clabel:L%7C${lat},${lng}&path=color:blue%7Cweight:2%7C${userLocation.latitude},${userLocation.longitude}%7C${lat},${lng}&key=${MAPS_API_KEY}`,
              }}
              style={{ width: "100%", height: 200 }}
            />
          )}
        </PressableArea>
        <Label
          content="Select a photo"
          customizedStyle={[styles.label, { marginTop: 20 }]}
        />

        <PressableArea
          customizedStyle={{ width: 150, height: 180 }}
          areaPressed={async () => {
            const imagePath = await pickPhoto(
              imagePermission,
              requestImagePermission
            );
            setImageUri(imagePath);
          }}
        >
          <ImageSelector imageURL={imageUri} />
        </PressableArea>
        <Label
          content="Take notes"
          customizedStyle={[styles.label, { marginTop: 20 }]}
        />

        <Input
          customizedStyle={{
            width: "90%",
            height: 120,
            alignSelf: "center",
            textAlign: "left",
            paddingLeft: 10,
            backgroundColor: "#f2f2f2",
          }}
          value={note}
          setEnteredValue={setNote}
          isMultiline={true}
        />

        {itineraryItemID && (
          <PressableArea
            customizedStyle={styles.buttonContainer}
            areaPressed={() => {
              Alert.alert("Delete", "Are you sure you want to delete this?", [
                { text: "NO", onPress: () => console.log("No Pressed") },
                {
                  text: "YES",
                  onPress: () => {
                    deleteItineraryItemById(itineraryID, itineraryItemID);
                    navigation.navigate("Itinerary", {
                      itineraryID: itineraryID,
                    });
                  },
                },
              ]);
            }}
          >
            <Label customizedStyle={styles.buttonText} content="Delete" />
          </PressableArea>
        )}
      </View>

      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="white" />
          <Text style={{ color: "white", marginTop: 10 }}>Loading...</Text>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
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
    width: "90%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6347",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
