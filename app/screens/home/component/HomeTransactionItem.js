import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import moment from "moment";
import { homeIcons } from "../../../assets/Images";
import Styles from "../../../resources/Styles";
import AppModal from "../../../components/AppModal";
import AppText from "../../../components/AppText";
import useUtils from "../../../hooks/useUtils";

const { width } = Dimensions.get("window");

export const HomeTransactionItem = (props) => {
  let item = props.item ? props.item.item : "";
  const [modalVisible, setModalVisible] = useState(false);
  const handlePreview = () => {
    setModalVisible(true);
  };
  const { onlyNumberFormat } = useUtils();

  let str = item.txnDesc;

  if (str.substring(0, 17) == "Дансны өндөрлөгөө") return <></>;

  return (
    <TouchableOpacity
      style={[Styles.center, Styles.row, { height: width > 700 ? 100 : 72 }]}
      onPress={handlePreview}
    >
      <View
        style={[
          Styles.bgWhite,
          Styles.borderRadius14,
          Styles.center,
          width > 700 ? Styles.icon64 : Styles.icon48,
        ]}
      >
        <Image
          resizeMode={"contain"}
          style={[width > 700 ? Styles.icon48 : Styles.icon42]}
          source={homeIcons["redUnit"]}
        />
      </View>
      <View style={[Styles.container, { marginLeft: 12 }]}>
        <Text
          numberOfLines={1}
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textDarkBlue80,
            Styles.fontWeight600,
            Styles.letterSpace05,
            { lineHeight: width > 700 ? 22 : 17.07 },
          ]}
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
          {moment(Date(item.txnDate)).format("YYYY.MM.DD")}
        </Text>
      </View>
      <View>
        <Text
          style={[
            Styles.textDarkBlue,
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.fontWeight600,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 22 : 17.07,
              textAlign: "right",
              width: width > 700 ? 120 : 79,
              height: 17,
            },
          ]}
        >
          {onlyNumberFormat(item.totalAmount)}
        </Text>
      </View>

      <AppModal
        icon="exchange-alt"
        isVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View
          style={[
            {
              marginLeft: 20,
              marginTop: 20,
            },
          ]}
        >
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon84 : Styles.icon64]}
            source={homeIcons["redUnit"]}
          />
        </View>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight600,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
              marginTop: 20,
            },
          ]}
        >
          {str.substring(0, 7) == "Буцаалт"
            ? item.txnDesc.slice(0, -16)
            : item.txnDesc}
        </AppText>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight400,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
            },
          ]}
        >
          Борлуулалтын дүн: {onlyNumberFormat(item.totalAmount)}
        </AppText>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight400,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
            },
          ]}
        >
          Гүйлгээний дүн: {onlyNumberFormat(item.txnAmount)}
        </AppText>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight400,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
            },
          ]}
        >
          Дугаар: {item.txnDesc.substring(item.txnDesc.length - 8)}
        </AppText>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight400,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
            },
          ]}
        >
          Хувь шимтгэл: {onlyNumberFormat(item.commAmount)}
        </AppText>
        <AppText
          style={[
            width > 700 ? Styles.text22 : Styles.text14,
            Styles.textBlue2,
            Styles.fontWeight400,
            Styles.letterSpace05,
            {
              lineHeight: width > 700 ? 30 : 20,
              marginLeft: 38,
              marginBottom: 20,
            },
          ]}
        >
          Огноо: {moment(Date(item.txnDate)).format("YYYY.MM.DD")}
        </AppText>
      </AppModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
  },
});
