import React from "react";
import { TouchableHighlight } from "react-native";
import Constants from "../resources/Constants";
import Styles from "../resources/Styles";
import AppText from "./AppText";

function AppPickerItem({ label, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={Constants.COLOR_CODE.black10}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <AppText style={(Styles.uppercase, Styles.p10)}>{label}</AppText>
    </TouchableHighlight>
  );
}

export default AppPickerItem;
