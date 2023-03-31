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
  limit,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { provideImage } from "../service/DataService";
import { getImageURL } from "../service/ImageService";

export default function ItineraryList({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(firestore, "itinerary"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, async(querySnapshot) => {
      if (querySnapshot.empty) {
        setData([]);
      } else {
        let items = [];
        const promises = querySnapshot.docs.map(async (itinerary) => {
          let item = itinerary.data();
          const itineraryRef = doc(firestore, "itinerary", itinerary.id);
          const itemsQuery = query(
            collection(itineraryRef, "items"),
            where("img", ">", ""),
            limit(1)
          );
          const itemsSnapshot = await getDocs(itemsQuery);
          const updatedUri = await Promise.all( 
            itemsSnapshot.docs.map(async (doc) => {
              const imageUri = await getImageURL(doc.data().img);
              return imageUri;
            })
          );
          item.imageUri = updatedUri.length > 0 ? updatedUri[0] : provideImage();
          items.push({ ...item, id: itinerary.id, userPhoto: "../assets/scenery.jpg"});
        });
        await Promise.all(promises);
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
            detailedPage="Itinerary"
            image={item.imageUri}
            id={item.id}
            userPhoto={item.userPhoto}
            goBack={true}
            title={item.name}
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
