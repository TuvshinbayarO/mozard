import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { promoIcons } from "../../../assets/Images";
import Styles from "../../../resources/Styles";
import moment from "moment";

function PromotionItem({ promo }) {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={styles.spacer}
      onPress={() =>
        navigation.navigate("PromotionDetail", {
          promoName: promo.promoName,
          promoDesc: promo.promoDesc,
        })
      }
    >
      <View
        style={[
          Styles.borderRadius12,
          Styles.p20,
          Styles.blueShadow,
          Styles.bgWhite,
          { marginLeft: 27, marginRight: 27 }
        ]}
      >
        <View style={[{flexDirection: "row"}]}>
          <View
            style={[
              Styles.bgWhite,
              Styles.borderRadius14,
              Styles.center,
              width > 700 ? Styles.icon64 : Styles.icon48
            ], {width: '15%'}}
          >
            <Image
              resizeMode={"contain"}
              style={[width > 700 ? Styles.icon64 : Styles.icon42]}
              source={promoIcons["promo"]}
            />
          </View>
          <View style={[{ marginLeft: 12, marginTop: 5, width: '85%' }]}>
            <Text
              style={[
                width > 700 ? Styles.text24 : Styles.text13,
                Styles.textDarkBlue80,
                Styles.fontWeight400,
                Styles.letterSpace05
              ]}
            >
              {promo.promoName}
            </Text>
            <Text></Text>
            <Text
              style={[
                width > 700 ? Styles.text24 : Styles.text13,
                Styles.textRed,
                Styles.fontWeight400,
                Styles.letterSpace05,
                {
                  marginRight: 25,
                  textAlign: "right"
                }
              ]}
            >
              {moment(Date(promo.promoStart)).format("YYYY.MM.DD")} {" -  "}
              {moment(Date(promo.promoEnd)).format("YYYY.MM.DD")}
            </Text>
          </View>
        </View>
      </View> 
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
  },
  spacer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default PromotionItem;
