import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import { convertDateToStr } from "../service/DatetimeService";
import { WebView } from "react-native-webview";
import Label from "../components/Label";

export default function DiaryDetail({ route }) {
  //need realtime data, not from route
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [user, setUser] = useState("");
  const [article, setArticle] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "travelDiary", route.params.id),
      (doc) => {
        if (doc) {
          console.log(doc.data());
          setTitle(doc.data().title);
          const createdAt = doc.data().createdAt;
          const date = createdAt.toDate();
          const dateString = convertDateToStr(date);
          setCreatedAt(dateString);
          setUser("Bella");
          setArticle(
            `<html><head><style>body {font-size: 40px;}</style></head><body>${
              doc.data().article
            }</body></html>`
          );
        }
      }
    );
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Label content={title}/>
      <Label content={user}/>
      <Label content={createdAt}/>
      <WebView source={{ html: article }} />
    </View>
  );
}
