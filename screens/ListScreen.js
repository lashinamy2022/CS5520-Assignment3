import { View, Text, FlatList } from "react-native";
import React from "react";
import Square from "../components/Square";

export default function ListScreen() {
  const data = [
    {
      //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "1 Item",
      image: "11",
    },
    {
      //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "2 Item",
      image: "22",
    },
    {
      //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "3 Item",
      image: "33",
    },
    {
      //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "4 Item",
      image: "11",
    },
    {
      //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "5 Item",
      image: "22",
    },
    {
      //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "6 Item",
      image: "33",
    },
    {
      //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "7 Item",
      image: "11",
    },
    {
      //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "8 Item",
      image: "22",
    },
  ];

  return (
    <View>
      <Text>ListScreen!!!!</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Square title={item.title} image={item.image} />
        )}
        numColumns={2}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}></View>
    </View>
  );
}
