import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase-setup";
import Timeline from "react-native-timeline-flatlist";
import CommonStyles from "../style/CommonStyles";
import { getImage } from "../service/ImageService";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
} from "firebase/firestore";

const TimelineList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, "itinerary"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.empty) {
        setItems([]);
      } else {
        const updatedItems = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            let entity = { ...doc.data(), id: doc.id };
            if (doc.data().completed) {
              entity = { ...entity, ...CommonStyles.taskCompleted };
            } else {
              entity = { ...entity, ...CommonStyles.taskNotDone };
            }
            const uri = await getImage(doc.data().img);
            entity.img = uri;
            return entity;
          })
        );
        setItems([...updatedItems, ...updatedItems, ...updatedItems]);
      }
    });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Timeline
        style={styles.list}
        data={items}
        circleSize={18}
        renderTime={({ time }) => (
          <View>
            <View style={styles.time}>
              <Text style={{color: "white", fontSize: 10}}>{time.split(" ")[0]}</Text>
            </View>
            <View >
              <Text style={{textAlign: "center"}}>{time.split(" ")[1]}</Text>
            </View>
          </View>
        )}
        descriptionStyle={{ color: "gray" }}
        options={{
          style: { paddingTop: 5 },
          showsVerticalScrollIndicator: false, // hide the scrollbar
        }}
        innerCircle={"icon"}
        circleColor="rgba(0,0,0,0)"
        renderDetail={(rowData, sectionID, rowID) => {
          let title = <Text style={[styles.title]}>{rowData.title}</Text>;
          var desc = null;
          if (rowData.note && rowData.img) {
            desc = (
              <View style={styles.descriptionContainer}>
                <Image source={{ uri: rowData.img }} style={styles.image} />
                <Text style={[styles.textDescription]}>{rowData.note}</Text>
              </View>
            );
          }
          return (
            <View style={{ flex: 1 }}>
              {title}
              {desc}
            </View>
          );
        }}
      />
    </>
  );
};

export default TimelineList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 20,
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  time: [
      { textAlign: "center", padding: 5, borderRadius: 13 },
      CommonStyles.pinkBackgroundColor,
    ]
  
});
