import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import React from "react";
import PressableArea from "../components/PressableArea";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function Setting() {
  const [username, setUsername] = useState("Me");
  const [showName, setShowName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleNamePress = () => setShowName(!showName);
  const handlePasswordPress = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.text}>Username: </Text>
          {showName ? (
            <>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              <View style={styles.icon}>
                <PressableArea
                  // customizedStyle={styles.icon}
                  areaPressed={handleNamePress}
                >
                  <Entypo name="check" size={24} color="black" />
                </PressableArea>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.usernameText}> {username}</Text>

              <View style={styles.icon}>
                <PressableArea
                  // customizedStyle={styles.icon}
                  areaPressed={handleNamePress}
                >
                  <Feather name="edit-3" size={24} color="black" />
                </PressableArea>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <PressableArea
          areaPressed={handlePasswordPress}
          customizedStyle={styles.custmomizedStyle}
        >
          <Text style={styles.text}>Update Password</Text>
        </PressableArea>
        {showPassword && (
          <>
            <View style={styles.originalPassword}>
              <Text style={styles.passwordText}>Original Password: </Text>
              <Text style={styles.passwordText}>123456</Text>
            </View>
            <View style={styles.changePassword}>
              <View style={styles.editPassword}>
                <Text style={styles.passwordText}>Password</Text>

                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(numberInput) => {
                    setPassword(numberInput);
                  }}
                />
              </View>

              <View style={styles.confirmContainer}>
                <View style={styles.editPassword}>
                  <Text style={styles.passwordText}>Confirm Password</Text>

                  <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    autoCapitalize="none"
                    onChangeText={(newPassword) => {
                      setConfirmPassword(newPassword);
                    }}
                  />
                </View>
              </View>

              <PressableArea
                areaPressed={handlePasswordPress}
                customizedStyle={styles.confirmPasswordButton}
              >
                <Text style={styles.text}>Confirm Password</Text>
              </PressableArea>
            </View>
          </>
        )}
      </View>

      <PressableArea customizedStyle={styles.signoutButton}>
        <Text style={styles.text}>Sign out</Text>
      </PressableArea>
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
    // marginBottom: "30%",
    // justifyContent: "center",
    alignItems: "center",
    // fontSize: 20,
  },

  text: {
    fontSize: 20,
  },

  usernameText: {
    width: 50,
    fontSize: 20,
    marginLeft: 18,
    textAlign: "center",
  },

  input: {
    borderBottomWidth: 2,
    width: 50,
    marginLeft: 4,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 18,
  },

  flexRow: {
    flexDirection: "row",
  },

  icon: {
    marginLeft: 30,
  },

  custmomizedStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    // marginLeft: "4%",
    // marginTop: "10%",
    width: "70%",
  },

  originalPassword: {
    flexDirection: "row",
    marginTop: "10%",
    marginRight: "10%",
  },

  changePassword: {
    marginTop: "10%",
    marginLeft: "9%",
    // flexDirection: "row",
    // alignItems: "center",
  },

  passwordInput: {
    borderBottomWidth: 2,
    width: 130,
    marginLeft: 20,
    fontSize: 18,
    // textAlign: "center",
    marginBottom: 2,
  },

  confirmContainer: {
    marginTop: "10%",
  },

  editPassword: {
    flexDirection: "row",
  },

  confirmPasswordButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginLeft: "10%",
    marginTop: "15%",
    width: "70%",
  },

  signoutButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginLeft: "15%",
    marginBottom: "12%",
    width: "70%",
  },

  passwordText: {
    fontSize: 18,
    marginTop: 3,
  },
});
