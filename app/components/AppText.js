import React from "react";
import { Text } from "react-native";

import Styles from "../resources/Styles";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text {...otherProps} style={[Styles.text14, Styles.textBlue, style]}>
      {children}
    </Text>
  );
}
export default AppText;
