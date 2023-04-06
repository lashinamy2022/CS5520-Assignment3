import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import React from "react";
import PressableArea from "../components/PressableArea";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-setup";
import CommonStyles from "../style/CommonStyles";

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
          customizedStyle={styles.updateButton}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </PressableArea>
        {showPassword && (
          <>
            <View style={styles.passwordInputContainer}>
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
                  <Text style={styles.buttonText}>Confirm Password</Text>
                </PressableArea>
              </View>
            </View>
          </>
        )}
      </View>

      <PressableArea
        areaPressed={() => {
          signOut(auth);
        }}
        customizedStyle={styles.signoutButton}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </PressableArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },

  nameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  passwordContainer: {
    flex: 2,
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

  updateButton: [
    CommonStyles.lightGreenBackground,
    {
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: 300,
      marginVertical: 10,
      marginLeft: "15%",
    },
  ],

  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  passwordInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  originalPassword: {
    flexDirection: "row",
    marginTop: "5%",
    marginRight: "10%",
  },

  changePassword: {
    marginTop: "10%",
    marginLeft: "10%",
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

  confirmPasswordButton: [
    CommonStyles.lightGreenBackground,
    {
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      marginVertical: 50,
      width: 250,
    },
  ],

  signoutButton: [
    CommonStyles.lightGreenBackground,
    {
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      marginVertical: 30,
      width: "80%",
      marginBottom: "10%",
      marginLeft: "10%",
    },
  ],

  passwordText: {
    fontSize: 18,
    marginTop: 3,
  },
});
