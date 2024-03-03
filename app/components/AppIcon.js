import React from "react";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function AppIcon({ name, size = 40, color = "#000", style }) {
  return (
    <View style={style}>
      <FontAwesome5 name={name} color={color} size={size} />
    </View>
  );
}

export default AppIcon;
