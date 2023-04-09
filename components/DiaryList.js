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
import { auth } from "../firebase/firebase-setup";
import { getUserInfo } from "../firebase/firebase-helper";
import { getImageURL } from "../service/ImageService";

export default function DiaryList({ route, from }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let q;
    if (from === "home") {
      q = query(
        collection(firestore, "travelDiary"),
        where("articleStatus", "==", "2"),
        orderBy("createdAt", "desc")
      );
    } else if (from === "me") {
      q = query(
        collection(firestore, "travelDiary"),
        where("user", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );
    }

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.empty) {
        setData([]);
      } else {
        const updatedItems = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            let item = doc.data();
            item.id = doc.id;
            item.username = "";
            // item.userPhoto = "../assets/scenery.jpg";
            item.userPhoto = "";
            if (item.article) {
              const imageUri = extractImageOrAddImage(item.article);
              item.imageUri = imageUri;
            }
            if (item.user) {
              const userInfo = await getUserInfo(item.user);
              if (userInfo) {
                item.username = userInfo.nickname;
                if (userInfo.photo) {
                  item.userPhoto = await getImageURL(userInfo.photo);
                }
              }
            }
            return item;
          })
        );
        setData([...updatedItems]);
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Square
            detailedPage="DiaryDetail"
            image={item.imageUri}
            id={item.id}
            userPhoto={item.userPhoto}
            username={item.username}
            title={item.title}
            from={from}
            needCollection={true}
          />
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
