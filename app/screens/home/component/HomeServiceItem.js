import React from "react";
import { TouchableOpacity, Dimensions, View } from "react-native";
import Constants from "../../../resources/Constants";
import AppText from "../../../components/AppText";
import Styles from "../../../resources/Styles";

const { width } = Dimensions.get("window");

export const HomeServiceItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={Styles.opacity60.opacity}
      style={[
        Styles.center,
        Styles.mLR10,
        width > 700 ? Styles.mTB12 : Styles.mTB6,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          width > 700
            ? { width: (width - 60) / 2, height: 80 }
            : { width: (width - 60) / 2, height: (width - 270) / 2 },
          Styles.center,
          { backgroundColor: Constants.COLOR_CODE.blackt, borderRadius: 12 },
        ]}
      >
        <AppText
          numberOfLines={2}
          style={[
            width > 700 ? Styles.text22 : Styles.text16,
            Styles.textWhite,
            Styles.textAlign,
            Styles.mTB12,
          ]}
        >
          {item.menuName}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
