import { StyleSheet } from "react-native";
const CommonStyles = StyleSheet.create({
  greenBackground: {
    backgroundColor: "rgb(80,149,74)",
  },
  lightGreenBackground: {
    backgroundColor: "rgb(135, 173, 132)",
  },
  greenBorder: {
    borderColor: "rgb(80,149,74)",
  },
  lightGreenBorder: {
    borderColor: "rgb(135, 173, 132)",
  },
  yellowBackground: {
    backgroundColor: "#c6c3b3",
  },
  yellowBorder: {
    borderColor: "#c6c3b3",
  },
  pinkBackgroundColor: {
    backgroundColor: "#ff9797",
  },
  taskNotDone: {
    lineColor: "#ffde97",
    circleColor: "#ffde97",
  },
  taskCompleted: {
    icon: require("../assets/archery.png"),
    lineColor: "rgb(135, 173, 132)",
  },
  deleteButtonBackground: {
    backgroundColor: "#ff6347",
  },
  yellowActiveTab: "#ffd700",
  whiteInactiveTab: "#f8f8ff",
  addScreen: "#000000AA",
  addScreenIcon: "#dcdcdc",
  heartRed: "rgb(227, 77, 71)",
  pressed: "#e9e",
  lightGreen: "rgb(135, 173, 132)",
});

export default CommonStyles;
