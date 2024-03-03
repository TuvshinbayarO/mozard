import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "../../resources/Styles";
import AppImageResponsive from "../../components/AppImageResponsive";
import AppText from "../../components/AppText";
import { tagIcons } from "../../assets/Images";

const { width } = Dimensions.get("window");

function TagItem({ name, tagId, onPress }) {
  // const disableMenu = ["Цаасан карт"];
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      style={{
        flex: 1 / 3,
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={false}
    >
      <ImageBackground
        style={[Styles.icon96, Styles.center, Styles.container, Styles.row,
          { opacity: 1 }
        ]}
        source={require("../../assets/icons/ic_menu_item_bg_2.png")}
      >
        <AppImageResponsive
          scale="80%"
          // source={require("../../assets/Pay.png")}
          source={tagIcons["tag" + tagId]}
        />
      </ImageBackground>
      <AppText
        numberOfLines={2}
        style={[
          Styles.container,
          Styles.alignFlexWrap,
          Styles.center,
          width > 700 ? Styles.text20 : Styles.text12,
          Styles.mTB12,
        ]}
      >
        {name}
      </AppText>
    </TouchableOpacity>
  );
}

export default TagItem;
