import React from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import HTMLView from "react-native-htmlview";

import Styles from "../../resources/Styles";
import colors from "../../config/colors";

const { width } = Dimensions.get("window");

export const HelpDetail = (props) => {
  let item = props.route ? props.route.params : "";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[{ borderColor: "gray", borderRadius: 10, marginBottom: 15 }]}
      key={item.promoId}
    >
      {/* <Image source={promoIcons["promo"]} style={[{ borderRadius: 10, width: width - 40, marginLeft:20,marginTop:20, height: 250 }]} /> */}
      <Text
        style={[
          width > 700 ? Styles.text30 : Styles.text18,
          Styles.fontWeight600,
          { marginTop: 20, color: "#24173D", marginLeft: 20, lineHeight: 27 },
        ]}
      >
        {item.name}
      </Text>
      <View style={[Styles.text14,
          Styles.fontWeight400,
          {
            color: "#24173D80",
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
            marginRight: 20,
            lineHeight: 21,
          }]}>
        <HTMLView
          value={item.description} stylesheet={stylesHtml}
        />
      </View>
    </ScrollView>
  );
};

const stylesHtml = StyleSheet.create({
  span: {
    color: "#3498DB"
  },
  a: {
    color: "#E74C3C"
  },
  body: {
    lineHeight: 21,
    color: "#24173D80",
    textAlign: "justify"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontWeight: "500",
  },
  h4: {
    color: "#191970",
    fontSize: 16,
    fontWeight: "400",
  },
});