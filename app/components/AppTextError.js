import React from "react";
import { View, Image } from "react-native";

import Styles from "../resources/Styles";
import AppText from "./AppText";

function AppTextError({ children, style }) {
  return (
    <View
      style={[
        Styles.row,
        Styles.center,
        Styles.bgWhite,
        Styles.borderRadius12,
        Styles.p10,
        Styles.m10,
      ]}
    >
      <View style={[{width: '20%'}]}>
        <Image
          style={[Styles.icon42]}
          source={require("../assets/icons/ic_warning.png")}
        />
      </View>
      <View style={[{marginLeft: 10, width: '80%', marginTop: 10}]}>
        <AppText
          style={[Styles.container, Styles.alignFlexWrap, Styles.textRed, style]}
        >
          {children}
        </AppText>
      </View>
      
    </View>
  );
}
export default AppTextError;
