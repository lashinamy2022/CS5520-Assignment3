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

export default function DiaryList({ route, from }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let q;
    if (from === "home") {
      q =  query(collection(firestore, "travelDiary"),  where("articleStatus", "==", "2"), orderBy("createdAt", "desc"));
    } else if (from === "me") {
      q =  query(collection(firestore, "travelDiary"), orderBy("createdAt", "desc"));
    }

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
            title={item.title}
            from={from}
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
