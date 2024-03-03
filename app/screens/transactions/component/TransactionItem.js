import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

import { homeIcons } from "../../../assets/Images";
import Styles from "../../../resources/Styles";
import moment from "moment";
import AppModal from "../../../components/AppModal";
import AppText from "../../../components/AppText";
import useUtils from "../../../hooks/useUtils";
import { useNavigation } from "@react-navigation/core";

const { width } = Dimensions.get("window");

export const TransactionItem = (props) => {
  let item = props.item ? props.item.item : "";
  const type = props.type ? props.type : 1;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePreview = () => {
    setModalVisible(true);
  };
  const { onlyNumberFormat } = useUtils();

  const printPriview = () => {
    navigation.navigate("PrintPriview", {id: item.id});
  }

  return (
    <View>
      {type === 1 ? (
        <View
          style={[Styles.center, Styles.row, Styles.mLR10, { height: width > 700 ? 85 : 72 }]}
        >
          <TouchableOpacity style={[Styles.container, { marginLeft: 12 }]}
            onPress={handlePreview}
          >
            <Text
              numberOfLines={1}
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textDarkBlue80,
                Styles.fontWeight600,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 40 : 17.07 },
              ]}plan
            >
              {item.txnDesc}
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text18 : Styles.text11,
                Styles.textDarkBlue80,
                Styles.fontWeight400,
                Styles.letterSpace05,
              ]}
            >
              {moment
                .unix(item.salesDate / 1000 || item.purchaseDate / 1000 || item.txnDate / 1000)
                .format("YYYY.MM.DD HH:mm") + " цаг"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePreview}>
            <Text
              style={[
                item.txnAmount >= 0 ? Styles.textGreen : Styles.textRed,
                // Styles.textDarkBlue,
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.fontWeight600,
                Styles.letterSpace05,
                {
                  lineHeight: width > 700 ? 25 : 17.07,
                  textAlign: "right",
                  width: width > 700 ? 100 : 79,
                  height: width > 700 ? 25 : 17,
                  marginRight:20
                },
              ]}
            >
              {item.commClass === 1 ? onlyNumberFormat(item.txnAmount) : onlyNumberFormat(item.totalAmount)}
              {/* {item.commClass === 1 && item.txnAmount >= 0 ? "+" + onlyNumberFormat(item.txnAmount) : onlyNumberFormat(item.txnAmount) } */}
            </Text>
          </TouchableOpacity>

          <AppModal
            isVisible={modalVisible}
            dismissText="Хаах"
            onDismiss={() => setModalVisible(false)}
          >
            <View style={[
                {
                  marginLeft: 20,
                  marginTop: 20,
                },
              ]}> 
              <Image
                resizeMode={"contain"}
                style={[width > 700 ? Styles.icon84 : Styles.icon64]}
                source={homeIcons["redUnit"]} 
              />
            </View>
            <View>
              <AppText
                style={[
                  width > 700 ? Styles.text26 : Styles.text14,
                  Styles.textBlue2,
                  Styles.fontWeight600,
                  Styles.letterSpace05,
                  {
                    lineHeight: width > 700 ? 45 : 20,
                    marginLeft: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  },
                ]}
              >
                {item.txnDesc}
              </AppText>
            </View>
            <View>
              <View>
                <Text
                  style={[
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.textBlue2,
                    Styles.fontWeight400,
                    Styles.letterSpace05,
                    { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
                  ]}
                >
                  Гүйлгээний дүн: {item.commClass === 1 ? onlyNumberFormat(item.txnAmount) : onlyNumberFormat(item.totalAmount)}
                </Text>
              </View>
            </View>
            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight400,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
              ]}
            >
              Хувь шимтгэл: {onlyNumberFormat(item.commAmount)}
            </AppText>
            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight400,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
              ]}
            >
              Огноо:{" "}
              {moment.unix(item.salesDate / 1000 || item.purchaseDate / 1000 || item.txnDate / 1000).format("YYYY.MM.DD HH:mm") +
                " цаг"}
            </AppText>
          </AppModal>
        </View>
      
      ) : (
        <TouchableOpacity
          style={[Styles.center, Styles.row, Styles.mLR10, { height: width > 700 ? 85 : 72 }]}
          onPress={handlePreview}
        >
          <View
            style={[
              Styles.mLR16,
              Styles.bgWhite,
              Styles.borderRadius14,
              Styles.center,
              width > 700 ? Styles.icon72 : Styles.icon48,
            ]}
          >
            <Image
              resizeMode={"contain"}
              style={[width > 700 ? Styles.icon84 : Styles.icon42]}
              source={homeIcons["redUnit"]}
            />
          </View>
          <View style={[Styles.container, { marginLeft: 12 }]}>
            <Text
              numberOfLines={1}
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textDarkBlue80,
                Styles.fontWeight600,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 30 : 17.07 },
              ]}plan
            >
              {item.txnDesc}
            </Text>
            <Text
              style={[
                width > 700 ? Styles.text18 : Styles.text11,
                Styles.textDarkBlue80,
                Styles.fontWeight400,
                Styles.letterSpace05,
              ]}
            >
              {moment
                .unix(item.salesDate / 1000 || item.purchaseDate / 1000 || item.txnDate / 1000)
                .format("YYYY.MM.DD HH:mm") + " цаг"}
            </Text>
          </View>
          <View>
            <Text
              style={[
                // item.txnAmount >= 0 ? Styles.textGreen : Styles.textRed,
                Styles.textDarkBlue,
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.fontWeight600,
                Styles.letterSpace05,
                {
                  lineHeight: width > 700 ? 25 : 17.07,
                  textAlign: "right",
                  width: width > 700 ? 100 : 79,
                  height: width > 700 ? 25 : 17,
                  marginRight:20
                },
              ]}
            >
              {item.commClass === 1 ? onlyNumberFormat(item.txnAmount) : onlyNumberFormat(item.totalAmount)}
            </Text>
          </View>

          <AppModal
            isVisible={modalVisible}
            dismissText="Хаах"
            onDismiss={() => setModalVisible(false)}
          >
            <View style={[
                {
                  marginLeft: 20,
                  marginTop: 20,
                },
              ]}> 
              <Image
                resizeMode={"contain"}
                style={[width > 700 ? Styles.icon84 : Styles.icon64]}
                source={homeIcons["redUnit"]} 
              />
            </View>
            <View>
              <AppText
                style={[
                  width > 700 ? Styles.text26 : Styles.text14,
                  Styles.textBlue2,
                  Styles.fontWeight600,
                  Styles.letterSpace05,
                  {
                    lineHeight: width > 700 ? 45 : 20,
                    marginLeft: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  },
                ]}
              >
                {item.txnDesc}
              </AppText>
            </View>
            <View>
              <View>
                <Text
                  style={[
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.textBlue2,
                    Styles.fontWeight400,
                    Styles.letterSpace05,
                    { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
                  ]}
                >
                  Гүйлгээний дүн: {item.commClass === 1 ? onlyNumberFormat(item.txnAmount) : onlyNumberFormat(item.totalAmount)}
                </Text>
              </View>
            </View>
            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight400,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
              ]}
            >
              Хувь шимтгэл: {onlyNumberFormat(item.commAmount || 0)}
            </AppText>
            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight400,
                Styles.letterSpace05,
                { lineHeight: width > 700 ? 25 : 20, marginLeft: 20, marginBottom: 20 },
              ]}
            >
              Огноо:{" "}
              {moment.unix(item.salesDate / 1000 || item.purchaseDate / 1000 || item.txnDate / 1000).format("YYYY.MM.DD HH:mm") +
                " цаг"}
            </AppText>
          </AppModal>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
  },
});
