import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableArea from "./PressableArea";
import { Ionicons } from "@expo/vector-icons";
import Label from "./Label";
import CommonStyles from "../style/CommonStyles";
import {convertNowDateToStr, convertNowTimeToStrWithoutSeconds, convertDateToStr, convertTimeToStrWithoutSeconds} from "../service/DatetimeService";

const DateTime = ({ navigation, route }) => {
 
  const [date, setDate] = useState(new Date());
  const [dateStr, setDateStr] = useState(convertNowDateToStr());
  const [timeStr, setTimeStr] = useState(convertNowTimeToStrWithoutSeconds());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableArea
          areaPressed={() => {
            navigation.navigate("AddPlace", {
              date: dateStr,
              time: timeStr,
              pageName: "datetime",
            });
          }}
        >
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation, date, dateStr, timeStr]);
  return (
    <View style={styles.container}>
      <PressableArea
        customizedStyle={[styles.button, CommonStyles.lightGreenBackground]}
        areaPressed={() => {
          setShowDate(true);
        }}
      >
        <Label
          content={dateStr}
          customizedStyle={{ color: "white" }}
        />
      </PressableArea>
      <PressableArea
        customizedStyle={[styles.button, CommonStyles.lightGreenBackground]}
        areaPressed={() => {
          setShowTime(true);
        }}
      >
        <Label
          content={timeStr}
          customizedStyle={{ color: "white" }}
        />
      </PressableArea>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display={"default"}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
           // console.log("android", selectedDate);
            setShowDate(false);
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setDateStr(convertDateToStr(currentDate));
          }}
        />
      )}
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          display={"default"}
          //minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowTime(false);
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setTimeStr(convertTimeToStrWithoutSeconds(currentDate));
          }}
        />
      )}
    </View>
  );
};

export default DateTime; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 50,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
