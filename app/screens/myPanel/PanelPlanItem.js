import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

import Styles from "../../resources/Styles";
import useUtils from "../../hooks/useUtils";

const { width } = Dimensions.get("window");

export const PanelPlanItem = (props) => {
  let item = props.item ? props.item.item : "";
  const { onlyNumberFormat } = useUtils();

  return (
    <View>
      <ScrollView horizontal>
        <View
          style={[
            Styles.bgWhite,
            Styles.borderRadius12,
            Styles.p20,
            Styles.blueShadow,
            {
              borderRadius: 24,
              height: width > 700 ? 340 : 270,
              width: width > 700 ? 250 : 200,
              marginLeft: 16,
              color: "white",
            },
          ]}
        >
          <View>
            <Text
              style={[
                Styles.fontWeight500,
                Styles.textDarkBlue80,
                width > 700 ? Styles.text32 : Styles.text20,
                Styles.letterSpace05,
                {
                  textAlign: "left",
                  marginTop: 10,
                  marginBottom: 10,
                },
              ]}
            >
              {item.groupName}
            </Text>
            <Text
              style={[
                Styles.fontWeight400,
                Styles.textBlue2,
                width > 700 ? Styles.text22 : Styles.text10,
                Styles.letterSpace05,
              ]}
            >
              Төлөвлөгөө
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text30 : Styles.text16,
                Styles.fontWeight500,
                Styles.textBlue2,
                Styles.letterSpace05,
              ]}
            >
              {onlyNumberFormat(item.txnEnd)}
            </Text>
            <Text
              style={[
                Styles.fontWeight400,
                Styles.textBlue2,
                width > 700 ? Styles.text22 : Styles.text10,
                {
                  marginTop: 10,
                },
              ]}
            >
              Гүйцэтгэл
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text30 : Styles.text16,
                Styles.fontWeight500,
                Styles.textBlue2,
                Styles.letterSpace05,
              ]}
            >
              {onlyNumberFormat(item.txnEnd)}
            </Text>
            <Text
              style={[
                Styles.fontWeight400,
                Styles.textBlue2,
                width > 700 ? Styles.text22 : Styles.text10,
                Styles.letterSpace05,
                {
                  marginTop: 10,
                },
              ]}
            >
              Дутуу
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text30 : Styles.text16,
                Styles.fontWeight500,
                Styles.textBlue2,
                Styles.letterSpace05,
              ]}
            >
              {onlyNumberFormat(item.txnEnd)}
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text32 : Styles.text18,
                Styles.fontWeight600,
                Styles.textRed,
                {
                  lineHeight: width > 700 ? 35 : 22.93,
                  letterSpacing: -1,
                  textAlign: "right",
                  marginRight: 10,
                  marginLeft: 20,
                },
              ]}
            >
              90%
              {/* {customerInfo.percent} */}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

