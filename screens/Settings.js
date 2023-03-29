import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import React from "react";
import PressableArea from "../components/PressableArea";

export default function Setting() {
  //   const [username, setUsername] = useState("Max");
  //   const [showName, setShowname] = useState(false);
  //   const [showPassword, setShowpassword] = useState(false);

  //   const handleNamePress = () => {
  //     setShowname(true);
  //   };
  //   const handlePasswordPress = () => {
  //     setShowpassword(true);
  //   };
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.nameContainer}>
  //         <PressableArea areaPressed={handleNamePress}>
  //           <Text style={styles.text}>Username: Me</Text>
  //         </PressableArea>
  //         {showName && (
  //           <TextInput
  //             style={styles.input}
  //             value={username}
  //             onChangeText={setUsername}
  //           />
  //         )}
  //       </View>
  //       <View style={styles.passwordContainer}>
  //         <PressableArea areaPressed={handlePasswordPress}>
  //           <Text style={styles.text}>Show me</Text>
  //         </PressableArea>
  //         {showPassword && <Text>Hi</Text>}
  //       </View>
  //     </View>
  //   );
  const [username, setUsername] = useState("Me");
  const [showName, setShowName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleNamePress = () => setShowName(!showName);
  const handlePasswordPress = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.text}>Username: </Text>
          {showName ? (
            <TextInput
              style={styles.text}
              value={username}
              onChangeText={setUsername}
            />
          ) : (
            <PressableArea areaPressed={handleNamePress}>
              <Text style={styles.text}> {username}</Text>
            </PressableArea>
          )}
        </View>
      </View>
      {/* <View style={styles.passwordContainer}>
        <PressableArea areaPressed={handlePasswordPress}>
          <Text style={styles.text}>Show me</Text>
        </PressableArea>
        {showPassword && <Text>Hi</Text>}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  passwordContainer: {
    flex: 2,
    // // flex: 1,
    // // marginTop: "20%",
    // justifyContent: "center",
    alignItems: "center",
    // fontSize: 20,
  },

  text: {
    fontSize: 20,
  },

  usernameContainer: {
    flexDirection: "row",
  },
});
