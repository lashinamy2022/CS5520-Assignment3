import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PressableArea from "./PressableArea";
import { useNavigation } from "@react-navigation/native";

export default function Square({ image, title, id, userPhoto }) {
  const navigation = useNavigation();
  const [collect, setCollect] = useState(false); //edit added
  function pressedTest() {
    setCollect(!collect);
  }

  function showDetails() {
    navigation.navigate("DiaryDetail", {
      image: image,
      title: "title test",
      id: id,
      userPhoto,
    });
    console.log("show details");
  }

  return (
    <View style={{ margin: 5 }}>
      <PressableArea areaPressed={showDetails}>
        <View style={styles.squareItem}>
          <Text>{image}</Text>
        </View>
      </PressableArea>
      <View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.image}
              source={require("../assets/scenery.jpg")} //need change
              // source={require({ userPhoto })} //need change
            />
            <Text style={styles.id}>{id}</Text>
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
