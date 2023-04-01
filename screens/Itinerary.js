import {
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  Modal,
  Text,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import TimelineList from "../components/TimelineList";
import Label from "../components/Label";
import CommonStyles from "../style/CommonStyles";
import PressableArea from "../components/PressableArea";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { deleteItinerary } from "../firebase/firebase-helper";

const Itinerary = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const itineraryID = route.params.itineraryID;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "itinerary", itineraryID),
      (doc) => {
        if (doc) {
          setName(doc.data().name);
          const days = doc.data().days;
          setDays(`${days} days`);
        }
      }
    );
    return function cleanup() {
      unsubscribe();
    };
  }, [route]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <PressableArea
          areaPressed={() => {
            if (route.params.goBack === true) {
              navigation.goBack();
            } else {
              navigation.navigate("HomeTab");
            }
          }}
        >
          <Ionicons name="close-outline" size={30} color="#fff" />
        </PressableArea>
      ),
      headerRight: () => (
        <PressableArea
          areaPressed={() => {
            navigation.navigate("AddPlace", { itineraryID: itineraryID });
          }}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <PressableArea
          areaPressed={() => {
            navigation.navigate("CreateItinerary", {
              buttonTitle: "save",
              itineraryID: itineraryID,
            });
          }}
        >
          <View>
            <Label
              content={name}
              customizedStyle={{ fontSize: 30, paddingLeft: 15, paddingTop: 5 }}
            />
            <Label
              content={days}
              customizedStyle={{ marginTop: 5, fontSize: 15, paddingLeft: 15 }}
            />
          </View>
        </PressableArea>

        <View style={{ justifyContent: "flex-start" }}>
          <Ionicons name="create-outline" size={20}></Ionicons>
        </View>
      </View>
      <View style={{ flex: 10 }}>
        <TimelineList itineraryID={itineraryID} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <PressableArea
          customizedStyle={styles.pressableAreaCustom}
          areaPressed={() => {
            Alert.alert(
              "Delete",
              "Are you sure you want to delete this whole itinerary?",
              [
                { text: "NO", onPress: () => console.log("No Pressed") },
                {
                  text: "YES",
                  onPress: () => {
                    deleteItinerary(itineraryID);
                    navigation.navigate("Me");
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </PressableArea>
      </View>
    </SafeAreaView>
  );
};

export default Itinerary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pressableAreaCustom: [
    {
      width: 90,
      height: 35,
      marginBottom: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    CommonStyles.deleteButtonBackground,
  ],
  buttonText: {
    fontSize: 17,
    color: "white",
    letterSpacing: 1,
  },
});
