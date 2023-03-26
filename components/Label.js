import { View, Text } from "react-native";
import React from "react";

const Label = ({ content, customizedStyle }) => {
  return (
    <>
      <Text
        style={[{ fontWeight: "bold"}, customizedStyle]}
      >
        {content}
      </Text>
    </>
  );
};

export default Label;
