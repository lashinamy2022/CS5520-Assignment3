import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React,{useEffect, useState} from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAPS_API_KEY } from "@env";
import PressableArea from "./PressableArea";
import CommonStyles from "../style/CommonStyles";
import Label from "./Label";
import { Ionicons } from "@expo/vector-icons";

const PlacesAutoComplete = ({navigation}) => {
  const [location, setLocation] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <PressableArea areaPressed={()=>{
          if (location === "") {
            Alert.alert(
              "Invalid input",
              "Please select a place",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
          }
          navigation.navigate("AddPlace", {pageName: "location", location: location, lat: lat, lng: lng})
        }}>
          <Ionicons name="checkmark-outline" size={30} color="#fff" />
        </PressableArea>
      )
    });
  },[navigation, location, lat, lng])
  
  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            width: "90%",
            marginTop: 50
          },
        }}
        placeholder="Type a place"
        query={{
          key: MAPS_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setLocation(data.description);
          const latitude = details.geometry.location.lat;
          const longitude = details.geometry.location.lng;
          setLat(latitude);
          setLng(longitude);
          console.log(latitude, longitude);
        }}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
      />
       
    </SafeAreaView>
  );
};

export default PlacesAutoComplete;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems:"center"
  },
});