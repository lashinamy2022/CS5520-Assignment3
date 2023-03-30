import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Square from "./Square";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { extractImageOrAddImage } from "../service/DataService";

export default function DiaryList({ title, articleStatus }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q =  query(collection(firestore, "travelDiary"),  where("articleStatus", "==", articleStatus), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
                setData([]);
      } else {
        let items = [];
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          if (item.article) {
            const imageUri = extractImageOrAddImage(item.article);
            item.imageUri = imageUri;
          }
          items.push({ ...item, id: doc.id, userPhoto: "../assets/scenery.jpg"});
        });
        setData(items);
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  // const data = [
  //   {
  //     title: "1 Item",
  //     image: "11",
  //     id: "id11",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "2 Item",
  //     image: "22",
  //     id: "id22",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "3 Item",
  //     image: "33",
  //     id: "id33",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "4 Item",
  //     image: "44",
  //     id: "id44",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "5 Item",
  //     image: "55",
  //     id: "id55",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "6 Item",
  //     image: "66",
  //     id: "id66",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "7 Item",
  //     image: "77",
  //     id: "id77",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  //   {
  //     title: "8 Item",
  //     image: "88",
  //     id: "id88",
  //     uaserPhoto: "../assets/scenery.jpg",
  //   },
  // ];

  return (
    <View style={styles.container}>
      {title && <Text>Title is {title}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Square
            title={item.title}
            image={item.imageUri}
            id={item.id}
            userPhoto={item.userPhoto}
          />
        )}
        numColumns={2}
      />
      {/* <View style={{ margin: 20 }}>
          <Image
            style={{ borderRadius: 50 }}
            source={require("../assets/scenery.jpg")}
          />
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
