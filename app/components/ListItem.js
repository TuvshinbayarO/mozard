import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";
import AppText from "./AppText";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 35,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 0,
    marginRight: 60,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: "#191970",
  },
});
export default ListItem;
