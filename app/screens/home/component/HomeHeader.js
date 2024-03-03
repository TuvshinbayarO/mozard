import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { homeIcons } from "../../../assets/Images";
import Styles from "../../../resources/Styles";
import useAuth from "../../../hooks/useAuth";

const { width } = Dimensions.get("window");

export const HomeHeader = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.headerContainer,
        Styles.bgTransparent,
        Styles.row,
        Styles.centerAlignItem,
        Styles.between,
        Styles.mLR20,
        { marginTop: 20 },
      ]}
    >
      <View>
        <Text
          style={[width > 700 ? Styles.text28 : Styles.text16, Styles.textLightBlue, { fontWeight: "500" }]}
        >
          {user.dealerCode}
        </Text>
      </View>
      <View style={[Styles.row]}>
        <TouchableOpacity
          style={[
            Styles.borderRadius16,
            Styles.center,
            Styles.mLR10,
          ]}
          onPress={() => navigation.navigate("Notification")}
        >
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon32 : Styles.icon20]}
            source={homeIcons["whiteBell"]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            Styles.borderRadius16,
            Styles.center,
            Styles.mLR10,
          ]}
          onPress={() => navigation.navigate("Bonus")}
        >
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon32 : Styles.icon20]}
            source={homeIcons["redGift"]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            Styles.borderRadius16,
            Styles.center,
            Styles.mLR10,
          ]}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon32 : Styles.icon20]}
            source={homeIcons["whiteMenu"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
  },
});
