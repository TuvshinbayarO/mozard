import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";

import Styles from "../resources/Styles";
import AppText from "./AppText";

const { width } = Dimensions.get("window");

function AppButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      style={[
        Styles.borderRadius14,
        Styles.p16,
        Styles.center,
        style ? style : disabled ? Styles.bgPurple : Styles.bgBlue,
        { marginTop: 20 },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <AppText style={[Styles.textWhite, Styles.uppercase, width > 700 ? Styles.icon26 : Styles.text14]}>{title}</AppText>
    </TouchableOpacity>
  );
}

export default AppButton;
