import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import AppText from "./AppText";
import { AppCheckboxIcons } from "../assets/Images";
import Styles from "../resources/Styles";

const { width, height } = Dimensions.get("window");

function AppCheckbox({ label, onPress, isChecked = false }) {
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      onPress={onPress}
      style={[Styles.container, Styles.row, Styles.alignSecondaryCenter]}
    >
      <Image
        style={Styles.icon48}
        source={
          isChecked ? AppCheckboxIcons.checked : AppCheckboxIcons.unchecked
        }
      />
      <AppText style={[width > 700 ? Styles.text22 : Styles.text14, {position: "absolute", margin: 50}]}>{label}</AppText>
    </TouchableOpacity>
  );
}

export default AppCheckbox;
