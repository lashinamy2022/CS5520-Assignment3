import { View, Text, Image } from "react-native";
import React from "react";

export default function DiaryDetail({ id, title, uaserPhoto, image }) {
  // title={item.title}
  // image={item.image}
  // id={item.id}
  // userPhoto={item.uaserPhoto}
  return (
    <View>
      <Text>The title of this diary is {title}</Text>
      {"\n"}
      <Text>The id of this diary is {id}</Text>
      {"\n"}
      <Text>The user photo of this diary is {uaserPhoto}</Text>
      <Text>The image of this diary is {image}</Text>
      {/* <Image source={}/> */}
    </View>
  );
}
