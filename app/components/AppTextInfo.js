import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Styles from "../resources/Styles";
import AppText from "./AppText";

function AppTextInfo({ children, ...otherProps }) {
  return (
    <View
      style={[
        Styles.bgWhite,
        Styles.borderRadius12,
        Styles.p20,
        Styles.blueShadow,
      ]}
    >
      <AppText style={Styles.textBlue2}>{children}</AppText>
    </View>
  );
}
export default AppTextInfo;
