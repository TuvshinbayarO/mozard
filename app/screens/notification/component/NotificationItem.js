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
import Styles from "../../../resources/Styles";
import moment from "moment";

function NotificationItem({ promo }) {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity
      // style={styles.spacer}
      onPress={() =>
        navigation.navigate("Detail", {
          promoName: promo.promoName,
          promoDesc: promo.promoDesc,
        })
      }
    >
      <View
        style={[
          {
            marginBottom: 15,
            alignItems: "flex-start",
            alignContent: "flex-start",
          },
        ]}
      >
        {/* <Image source={promoIcons["promo"]} style={[{ borderRadius: 10, width: width - 40, height: 250 }]} /> */}
        <Text
          style={[
            width > 700 ? Styles.text28 : Styles.text16,
            Styles.fontWeight600,
            { marginTop: 10, color: "#24173D", marginLeft: 20 },
          ]}
        >
          {promo.promoName}
        </Text>
        <Text
          style={[
            width > 700 ? Styles.text20 : Styles.text12,
            Styles.fontWeight400,
            { color: "#24173D80", marginLeft: 20, marginBottom: 10 },
          ]}
        >
          {moment.unix(promo.createDate / 1000).format("YYYY.MM.DD")}
        </Text>
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

export default NotificationItem;
