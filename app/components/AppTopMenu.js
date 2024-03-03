import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

import AppIcon from "./AppIcon";
import AppText from "./AppText";
import AppToolbar from "./AppToolbar";
import { useRoute } from "@react-navigation/native";
import Styles from "../resources/Styles";

const { width } = Dimensions.get("window");

function AppTopMenu(props) {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View style={[styles.buttons, styles.left]}>
        <TouchableOpacity onPress={() => alert("Back button")}>
          <View style={[styles.menuItem]}>
            <AppIcon name="chevron-left" size={width > 700 ? 34 : 24} color={Styles.textRed} />
          </View>
        </TouchableOpacity>
        <View style={[styles.menuItem]}>
          <AppText style={{ textTransform: "uppercase" }}>{route.name}</AppText>
        </View>
      </View>
      <AppToolbar />
    </View>
  );
}

export default AppTopMenu;
