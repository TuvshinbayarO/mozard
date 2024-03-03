import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { tagIcons } from "../../../assets/Images";

import AppImageResponsive from "../../../components/AppImageResponsive";
import AppText from "../../../components/AppText";
import Styles from "../../../resources/Styles";

const { width } = Dimensions.get("window");

export const HomeServiceItem = ({ item }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      style={[Styles.center, Styles.mLR10]}
      onPress={() =>
        navigate("Home", {
          screen: "Product",
          params: { title: item.menuName, tagId: item.tagId },
        })
      }
      >
      <ImageBackground
        style={[Styles.icon84, Styles.center]}
        source={require("../../../assets/icons/ic_menu_item_bg_2.png")}
      >
        <AppImageResponsive
          scale="80%"
          source={tagIcons['tag'+item.tagId]}
        />
      </ImageBackground>
      <AppText
        numberOfLines={2}
        style={[
          width > 700 ? Styles.text20 : Styles.text12,
          Styles.textWhite,
          Styles.textAlign,
          Styles.mTB12,
          {
            width: Styles.icon84.width,
          },
        ]}
      >
        {item.menuName}
      </AppText>
    </TouchableOpacity>
  );
  
};
