import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableArea from "./PressableArea";
import { Ionicons } from "@expo/vector-icons";
import Label from "./Label";
import {
  convertDateToStr,
  convertTimeToStrWithoutSeconds,
} from "../service/DatetimeService";

const DateTime = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableArea
          areaPressed={() => {
            navigation.navigate("AddPlace", {
              date: convertDateToStr(date),
              time: convertTimeToStrWithoutSeconds(date),
              pageName: "datetime",
            });
          }}
        >
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      ),
    });
  }, [navigation, date]);
  return (
    <View style={styles.container}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"datetime"}
        display={"default"}
        style={{ marginTop: 100 }}
        onChange={(event, selectedDate) => {
          // console.log("ios",selectedDate);
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }}
      />
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
