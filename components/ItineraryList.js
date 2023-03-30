import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Square from "./Square";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { extractImageOrAddImage } from "../service/DataService";

export default function ItineraryList({ title, articleStatus }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(firestore, "itinerary"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setData([]);
      } else {
        let items = [];
        querySnapshot.forEach((itinerary) => {
          const itineraryRef = doc(firestore, "itinerary", itinerary.id);
          const itemsQuery = collection(itineraryRef, "items");
         
          let imageUri = ""; 
          onSnapshot(itemsQuery, (itemsSnapshot) => {
            itemsSnapshot.forEach((doc) => {
              if (doc.data().img) {
                imageUri = doc.data().img;
                if (imageUri && imageUri !== "") {
                    return;
                }
              }
            });
          });
          console.log(imageUri);
        });
      }
    });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

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
