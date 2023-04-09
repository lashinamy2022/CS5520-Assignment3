import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase/firebase-setup";
import { diaryCollectionCount, hasCollected, saveCollection } from "../firebase/firebase-helper";
import CommonStyles from "../style/CommonStyles";
import PressableArea from "./PressableArea";
import { useIsFocused } from "@react-navigation/native";

const Heart = ({ diaryId, size }) => {
  const [count, setCount] = useState(0);
  const [collected, setCollected] = useState(false);
  const isFocused = useIsFocused("");

  useEffect(() => {
    async function getCollectionInfo() {
      const flag = await hasCollected(diaryId);
      if (!flag) {
        setCollected(false);
      } else {
        setCollected(true);
      }
      setTimeout(async ()=>{
        const num = await diaryCollectionCount(diaryId);
        setCount(num);
      }, 500);
    }

    getCollectionInfo();
  }, [collected, isFocused]);


  
  return (
    <PressableArea
      areaPressed={() => {
        const flag = !collected;
        setCollected(flag);
        saveCollection(diaryId, flag);

      }}
    >
      <View style={{flex: 1, flexDirection: "row"}}>
        <AntDesign
          name={collected ? "heart" : "hearto"}
          size={size}
          color={collected ? CommonStyles.heartRed : "grey"}
          style={{marginTop: 2}}
        />
        <Text style={{color: "grey", marginLeft: 5}}>{count}</Text>
      </View>
    </PressableArea>
  );
};

export default Heart;
