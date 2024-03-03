import React, { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppLoader from "../../components/AppLoader";
import useApi from "../../hooks/useApi";
import customerRegister from "../../api/customerRegister";
import Styles from "../../resources/Styles";
import AppTextInput from "../../components/AppTextInput";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";

function CustomerRegisterScreen({ route: { params } }) {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [phone, setPhone] = useState();
  const { request: getInfo } = useApi(customerRegister.getCustomerRegister);
  const navigation = useNavigation();
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handlePress = () => {
    // navigation.navigate("Info");
    if (phone === undefined || phone === "")
      return Alert.alert("Утасны дугаараа оруулна уу !");
    
    setLoading(true);
    getInfo(phone)
      .then((response) => {
        if (response.code !== 400) {
          if (response.register === 0) {
            navigation.navigate("Info", {
              response,
              phone,
              prodOptId: params.prodOpt?.prodOptId || params.option?.prodOptId
            });
            setInfo(null);
          } else {
            setInfo({desc: "Бүртгэл бүрэн тул уг үйлчилгээг ашиглах боломжгүй."})
          }
        } else {
          setInfo({desc: "Дугаарын мэдээлэл олдсонгүй."})
        }
      })
      .catch((error) => {
        setInfo({desc: "Агентийн мэдээлэл олдсонгүй."});
      }).finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigation.navigate("Home", {screen: "Product"});
  };

  return (
    <AppContent>
      <AppLoader visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Styles.container}
      >
        <Text
          style={[
            Styles.textDarkBlue,
            Styles.text16,
            Styles.fontWeight400
          ]}
        >
          Хэрэглэгчийн мэдээлэл шинэчлэх
        </Text>
        <Text></Text>
        {info && info.desc && (
          <AppText
            style={[Styles.textRed]}
          >{info.desc}</AppText>
        )}
        <AppTextInput
          icon="search"
          onChangeText={(phone) => setPhone(phone)}
          label="Утасны дугаар"
          keyboardType="numeric"
          autoFocus
          value={phone}
          maxLength={8}
        />
        <AppButton onPress={handlePress} title="Үргэлжлүүлэх" disabled={!phone || phone.length < 8}/>
        <AppButton onPress={handleCancel} style={Styles.bgGray} title="Цуцлах" />
      </KeyboardAvoidingView>
    </AppContent>
  );
}

export default CustomerRegisterScreen;
