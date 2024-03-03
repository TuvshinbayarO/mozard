import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../resources/Styles";
import Constants from "../resources/Constants";
import { StatusBar } from "expo-status-bar";

function AppContent({ children, style }) {
  return (
    <>
      <StatusBar animated={true} style="dark" />
      <LinearGradient
        style={[Styles.container, Styles.p20, { paddingTop: 40 }, style]}
        colors={[
          Constants.COLOR_CODE.white,
          Constants.COLOR_CODE.blue260,
          Constants.COLOR_CODE.blue260,
        ]}
        start={[0, 0]}
        end={[1, 1]}
      >
        {children}
      </LinearGradient>
    </>
  );
}

export default AppContent;
