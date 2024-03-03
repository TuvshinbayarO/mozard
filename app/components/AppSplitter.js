import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "../resources/Constants";

function AppSplitter({ style }) {
  return (
    <View style={style}>
      <View
        style={{
          borderBottomColor: Constants.COLOR_CODE.purple,
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: "100%",
        }}
      />
    </View>
  );
}

export default AppSplitter;
