import React from "react";
import { TouchableOpacity } from "react-native";

import Styles from "../resources/Styles";
import AppText from "./AppText";

function AppButton1({ title, onPress, style, disabled, styleText }) {
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      onPress={onPress}
      disabled={disabled}
      style={[
        Styles.borderRadius14,
        Styles.p16,
        Styles.center,
        style ? style : Styles.bgRed,
        Styles.mTB6,
      ]}
    >
      <AppText
        style={[Styles.uppercase, styleText ? styleText : Styles.textWhite]}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

export default AppButton1;
