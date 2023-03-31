import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "./PressableArea";
import { useNavigation } from "@react-navigation/native";

export default function Square({ detailedPage, image, title, id, userPhoto, goBack, from }) {
  console.log(id);
  const navigation = useNavigation();
  const [collect, setCollect] = useState(false); //edit added
  function pressedTest() {
    setCollect(!collect);
  }

  function showDetails() {
    const params = {
      userPhoto: userPhoto
    };
    if (detailedPage === "DiaryDetail") {
      params.diaryID = id;
      params.from = from;
    } else if (detailedPage === "Itinerary") {
      params.itineraryID = id;
      params.goBack = goBack;
    }
    console.log(detailedPage);
    navigation.navigate(detailedPage, params);
  }

  return (
    <View style={{ margin: 5 }}>
      <PressableArea areaPressed={showDetails}>
        <View style={styles.squareItem}>
        <Image
              source={{ uri: `${image}` }}
              style={{width: Dimensions.get("window").width / 2 - 16, height: 200}}
            />
        </View>
      </PressableArea>
      <View>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.image}
              source={require("../assets/scenery.jpg")} //need change
            />
            <Text style={styles.id}>Bella</Text>
          </View>

          {/* heart icon*/}
          <PressableArea areaPressed={pressedTest}>
            {collect ? (
              <AntDesign name="hearto" size={22} color="grey" />
            ) : (
              <AntDesign name="heart" size={22} color="red" />
            )}
          </PressableArea>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  squareItem: {
    backgroundColor: "grey",
    height: 200,
    width: Dimensions.get("window").width / 2 - 16,
    borderRadius: 5,
  },
  id: {
    fontSize: 16,
    color: "grey",
  },
  title: {
    fontSize: 20,
    width: 170,
    
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 5,
  },
});
