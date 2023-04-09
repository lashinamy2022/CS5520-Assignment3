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
import { auth } from "../firebase/firebase-setup";
import { getUserInfo } from "../firebase/firebase-helper";

export default function ItineraryList({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(firestore, "itinerary"),
      where("user", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
          item.imageUri =
            updatedUri.length > 0 ? updatedUri[0] : provideImage();

          item.username = "";
          item.userPhoto = "../assets/scenery.jpg";
          item.userPhoto = "";

          if (item.user) {
            const userInfo = await getUserInfo(item.user);
            if (userInfo) {
              item.username = userInfo.nickname;
              if (userInfo.photo) {
                item.userPhoto = await getImageURL(userInfo.photo);
              }
            }
          }

          items.push({ ...item, id: itinerary.id });
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
            needCollection={false}
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
