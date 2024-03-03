import React, { useState, useEffect } from "react";
import { Alert, KeyboardAvoidingView, Platform, Keyboard, Text, View, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppLoader from "../../components/AppLoader";
import useApi from "../../hooks/useApi";
import provisionHBB from "../../api/provisionHBB";
import Styles from '../../resources/Styles'
import { homeIcons } from "../../assets/Images";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppTextInput from "../../components/AppTextInput";

function HbbChargeScreen() {
  const { width, height } = Dimensions.get("window")
  const [info, setInfo] = useState();
  const [username, setUsername] = useState();
  const { request: getUserInfo, loading } = useApi(provisionHBB.checkUser);
  const navigation = useNavigation();
  useEffect(() => {
    Keyboard.dismiss();
    // onChangeState("prodOptId")(route.params.id);
  }, []);

  const handlePress = (username) => {
    if (username === undefined || username.trim() === "")
      return Alert.alert("Нэвтрэх нэрийг оруулна уу !");
      getUserInfo(username)
      .then((response) => {
        navigation.navigate("Info")
        // const regex = /-?\d+(\.\d+)?/g;
        // const billAmount = response.info.match(regex);
        // if (billAmount.length) {
        //   setInfo(
        //     requestedIsdn +
        //     " дугаартай хэрэглэгчийн төлбөр " +
        //     billAmount[0] +
        //     "₮ байна."
        //   );
        //   onChangeState("amount")(billAmount[0]);
        // } else {
        //   setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
        // }
      })
      .catch((error) => {
        navigation.navigate("Info2", {
          // username: 'NV35751222',
          // amount: '23’000'
        })
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };

  return (
    <>
      <View style={[{ backgroundColor: 'white' }]}>
        <AppLoader visible={loading} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image resizeMode={'contain'} style={[Styles.icon64, { marginLeft: 40, marginTop: 40 }]} source={homeIcons["redWifi"]} />
          <View style={[Styles.row, { width: width - 40 }]} >
            <Text style={[Styles.textBlue2, width > 700 ? Styles.text40 : Styles.text28, Styles.fontWeight400, { marginTop: 20, marginLeft: 40, letterSpacing: -1, lineHeight: 34 }]}>Өрхийн интернэт</Text>
          </View>
          <Text style={[Styles.textBlue2, width > 700 ? Styles.text20 : Styles.text12, Styles.fontWeight500, { marginTop: 20, marginLeft: 20 }]}>Нэвтрэх нэр</Text>
          <View style={[Styles.mLR20]}>
            <AppTextInput
        onChangeText={username => setUsername(username)}
        defaultValue={username}
        placeholderTextColor="#B4C5E050"
        autoFocus
        value={username}
      />
          </View>
          <TouchableOpacity style={[{ marginTop: 10, marginLeft: 40, marginBottom: 30, width: width - 90, height: 50, backgroundColor: '#B4C5E0', borderRadius: 15 }]} onPress={() => handlePress(username)}>
            {/* <Text style={[{ marginLeft: 100, marginTop: 15 }]}>ҮРГЭЛЖЛҮҮЛЭХ</Text> */}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

export default HbbChargeScreen;
