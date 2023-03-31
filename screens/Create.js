import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CommonStyles from "../style/CommonStyles";
import PressableArea from "../components/PressableArea";
import { useNavigation } from "@react-navigation/native";

export default function Create() {
  const navigation = useNavigation();
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setVisibility(true);
    });

    return unsubscribe;
  }, [navigation]);

  function itineraryPressed() {
    setVisibility(false);
    navigation.navigate("CreateItinerary", {buttonTitle: "create"});
  }

  function diaryPressed() {
    setVisibility(false);
    navigation.navigate("CreateDiary", { type: "new" });
  }

  function crossPressed() {
    setVisibility(false);
    navigation.navigate("HomeTab");
  }

  return (
    <View style={styles.modalContainer}>
      <Modal visible={visibility} transparent={true}>
        <View style={styles.container}>
          <View style={styles.cross}>
            <PressableArea areaPressed={crossPressed}>
              <Entypo
                name="cross"
                size={40}
                color={CommonStyles.addScreenIcon}
              />
            </PressableArea>
          </View>
          <View style={styles.bottomcontainer}>
            <PressableArea areaPressed={itineraryPressed}>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Add an itinerary</Text>
                <Feather
                  name="map-pin"
                  size={24}
                  color={CommonStyles.addScreenIcon}
                />
              </View>
            </PressableArea>
            <PressableArea areaPressed={diaryPressed}>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Add a travel diary</Text>
                <Feather
                  name="book-open"
                  size={24}
                  color={CommonStyles.addScreenIcon}
                />
              </View>
            </PressableArea>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  bottomcontainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 150,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 40,
    fontSize: 20,
    paddingVertical: 12,
  },
  text: {
    fontSize: 23,
    paddingRight: 10,
    color: CommonStyles.addScreenIcon,
  },
  cross: {
    marginTop: 70,
    marginLeft: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
