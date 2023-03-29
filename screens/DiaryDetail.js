import { View, Text, Image } from "react-native";
import React from "react";

export default function DiaryDetail({ route }) {
  // title={item.title}
  // image={item.image}
  // id={item.id}
  // userPhoto={item.uaserPhoto}
  console.log(route);
  return (
    <View>
      <Text>The title of this diary is {route.params.title}</Text>
      <Text>The id of this diary is {route.params.id}</Text>
      <Text>The user photo of this diary is {route.params.uaserPhoto}</Text>
      <Text>The image of this diary is {route.params.image}</Text>
      {/* <Image source={}/> */}
    </View>
  );
}
