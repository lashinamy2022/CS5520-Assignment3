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
import { deleteItinerary, getStartDate } from "../firebase/firebase-helper";
import { useIsFocused } from "@react-navigation/native";
import { scheduleNotificationHandler } from "../service/NotificationService";


const Itinerary = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const itineraryID = route.params.itineraryID;
  const [showBell, setShowBell] = useState(false);


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
      {/* the information container */}
      <View style={{ flex: 1 }}>
        {/* the first line */}
        <View>
          <PressableArea
            areaPressed={() => {
              navigation.navigate("CreateItinerary", {
                buttonTitle: "save",
                itineraryID: itineraryID,
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Label
                content={name}
                customizedStyle={{
                  fontSize: 30,
                  paddingLeft: 15,
                  paddingTop: 20,
                }}
              />
              <View style={{ marginTop: 28, marginLeft: 4 }}>
                <Ionicons name="create-outline" size={20}></Ionicons>
              </View>
            </View>
          </PressableArea>
        </View>
        {/* second line */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Label
            content={days}
            customizedStyle={{
              fontSize: 20,
            }}
          />
         {showBell && <PressableArea
            areaPressed={() => {
              Alert.alert("", "Do you want to set a reminder before the trip ?", [
                { text: "NO", onPress: () => console.log("No Pressed") },
                {
                  text: "YES",
                  onPress: async () => {
                    const startDate = await getStartDate(itineraryID);
                    if (startDate !== "") {
                      
                      const notificationID = await scheduleNotificationHandler(startDate);
                      console.log(notificationID);
                    } 
                  },
                },
              ]);
             
            }}
          >
            <View style={styles.bellContainer}>
              <Ionicons
                name="notifications"
                size={35}
                color={"rgb(250,223,160)"}
                // style={{ marginTop: 6, marginLeft: 8 }}
              />
              <Text style={styles.bellText}>Remind me</Text>
            </View>
          </PressableArea>}
        </View>
      </View>

      {/* timeline list container */}
      <View style={styles.listContainer}>
        <TimelineList itineraryID={itineraryID} setShowBell={setShowBell} />
      </View>

      {/* timeline button Container */}
      <View style={styles.buttonContainer}>
        <PressableArea
          customizedStyle={styles.deleteButton}
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
      marginTop: 20,
      width: 150,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    CommonStyles.greenBackground,
  ],
  deleteButton: [
    {
      width: "50%",
      height: "25%",
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bellContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bellText: {
    fontSize: 15,
  },
  listContainer: {
    flex: 7,
    marginTop: 30,
    padding: 20,
  },
});
