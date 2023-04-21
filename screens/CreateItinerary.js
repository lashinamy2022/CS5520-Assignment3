import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import PressableArea from "../components/PressableArea";
import { Ionicons } from "@expo/vector-icons";
import {
  editItineraryToDB,
  writeItineraryToDB,
} from "../firebase/firebase-helper";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { async } from "@firebase/util";
import CommonStyles from "../style/CommonStyles";

export default function CreateItinerary({ navigation, route }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const itineraryID = route.params.itineraryID;
  const buttonTitle = route.params.buttonTitle;
  const [loading, setLoading] = useState(false);
  // console.log(itineraryID);

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
    });
  }, []);

  useEffect(() => {
    async function renderData() {
      if (itineraryID) {
        try {
          const itineraryRef = doc(firestore, "itinerary", itineraryID);
          const docSnap = await getDoc(itineraryRef);
          if (docSnap.exists()) {
            setName(docSnap.data().name);
            setDays(docSnap.data().days);
          }
        } catch (err) {
          console.log("itineraryRef", err);
        }
      }
    }
    renderData();
  }, []);

  async function createButtonPressed() {
    if (name === "" || days === "") {
      Alert.alert("Invalid input", "Please check your input values", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    if (!days.match(/^[0-9]*$/)) {
      Alert.alert("Invalid input", "Please enter numbers for days", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    const itinerary = {
      name: name,
      days: days,
    };
    setLoading(true);
    if (!itineraryID) {
      const id = await writeItineraryToDB(itinerary);
      navigation.navigate("Itinerary", { itineraryID: id });
    } else {
      const id = await editItineraryToDB(itineraryID, itinerary);
      navigation.navigate("Itinerary", { itineraryID: itineraryID });
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.middleContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Itinerary Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              autoCapitalize="none"
              onChangeText={(changedText) => {
                setName(changedText);
              }}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Days</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={days}
              autoCapitalize="none"
              onChangeText={(changedText) => {
                setDays(changedText);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableArea
          areaPressed={createButtonPressed}
          // disabled={loading}
          customizedStyle={styles.custmomizedStyle}
        >
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </PressableArea>
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
  container: {
    flex: 1,
  },

  middleContainer: {
    marginTop: "20%",
    justifyContent: "center",
  },

  inputContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 5,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    width: "75%",
    margin: 25,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginTop: 20,
  },

  itemContainer: {
    margin: 18,
  },

  custmomizedStyle: [
    CommonStyles.lightGreenBackground,
    {
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: "30%",
      marginVertical: 10,
      marginLeft: "10%",
    },
  ],
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
