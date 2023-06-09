import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "./PressableArea";
import { useNavigation } from "@react-navigation/native";
import Heart from "./Heart";
import CommonStyles from "../style/CommonStyles";
import { connectActionSheet } from "@expo/react-native-action-sheet";

export default function Square({
  detailedPage,
  image,
  title,
  id,
  userPhoto,
  username,
  goBack,
  from,
  needCollection,
}) {
  const navigation = useNavigation();

  function showDetails() {
    const params = {
      userPhoto: userPhoto,
      username: username,
    };
    if (detailedPage === "DiaryDetail") {
      params.diaryID = id;
      params.from = from;
    } else if (detailedPage === "Itinerary") {
      params.itineraryID = id;
      params.goBack = goBack;
    }
    // console.log(params);
    navigation.navigate(detailedPage, params);
  }

  return (
    <View style={{ margin: 5 }}>
      <PressableArea areaPressed={showDetails}>
        <View style={styles.squareItem}>
          <Image
            source={{ uri: `${image}` }}
            style={{
              width: Dimensions.get("window").width / 2 - 16,
              height: 200,
            }}
          />
        </View>
      </PressableArea>
      <View>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={{ flexDirection: "row" }}>
            {userPhoto !== "" ? (
              <Image style={styles.image} source={{ uri: userPhoto }} />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/scenery.jpg")}
              />
            )}
            <Text style={styles.id}>{username}</Text>
          </View>
          {/* heart icon*/}
          {needCollection && <Heart diaryId={id} size={15} />}
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
