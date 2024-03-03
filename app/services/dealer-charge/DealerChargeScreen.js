import React, { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppLoader from "../../components/AppLoader";
import useApi from "../../hooks/useApi";
import dealerInfo from "../../api/dealer";
import Styles from "../../resources/Styles";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import AppContent from "../../components/AppContent";
import AppPicker from "../../components/AppPicker";
import AppText from "../../components/AppText";

const types = [
  {
    label: "Утасны дугаараар",
    value: 0,
  },
  {
    label: "Кодоор",
    value: 1,
  },
];

function DealerChargeScreen() {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [type, setType] = useState();
  const [phone, setPhone] = useState();
  const { request: getInfo } = useApi(dealerInfo.getDealerInfoByPhone);
  const { request: getInfoCode } = useApi(dealerInfo.getDealerInfoByCode);
  const navigation = useNavigation();

  useEffect(() => {
    Keyboard.dismiss();
    setDefaults();
  }, []);

  const setDefaults = () => {
    setType(types[0]);
  }

  const handlePress = () => {
    if (phone === undefined || phone === "")
      return Alert.alert("", "Гэрээт борлуулагчийн утасны дугаар оруулна уу !");
    
    setLoading(true);
    if (type.value === 0) {
      getInfo(phone).then((response) => {
        if (response.result && response.result.length > 0) {
          setInfo();
          navigation.navigate("Info", {
            response: response.result,
            dealerPhone: phone,
          });
        } else {
          setInfo({desc: phone + " дугаартай гэрээт борлуулагчийн мэдээлэл олдсонгүй."});
        }
      }).catch(error => {
        console.log('error', error);
      })
      .finally(() => {
        setLoading(false);
      });
    } else if (type.value === 1) {
      getInfoCode(phone).then((response) => {
        if (response.result && response.result.length > 0) {
          setInfo();
          navigation.navigate("Info", {
            response: response.result,
            dealerCode: phone,
          });
        } else {
          setInfo({desc: phone + " кодтой гэрээт борлуулагчийн мэдээлэл олдсонгүй."});
        }
      }).catch(error => {
        setInfo({desc: "Мэдээлэл олдсонгүй."});
      })
      .finally(() => {
        setLoading(false);
      });
    }
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
              width > 700 ? Styles.text28 : Styles.text16,
              Styles.fontWeight400
            ]}
          >
            Гэрээт борлуулагч цэнэглэх
          </Text>
          <Text></Text>
          {info && info.desc && (
            <AppText
              style={[Styles.textRed]}
            >{info.desc}</AppText>
          )}
          <AppPicker
            label="Төрөл"
            items={types}
            placeholder="сонгох"
            selectedItem={type}
            onSelectItem={(item) => {
              setType(item);
            }}
          />
          <AppTextInput
            icon="search"
            onChangeText={phone => setPhone(phone)}
            label="Гэрээт борлуулагчийн утасны дугаар / код"
            keyboardType="numeric"
            keyboardType={type && type.value === 0 ? 'numeric' : 'default'}
            autoFocus
            value={phone}
          />
          {type && type.value === 0 && <AppButton onPress={handlePress} title="Үргэлжлүүлэх" disabled={!phone || phone.length < 8} />}
          {type && type.value === 1 && <AppButton onPress={handlePress} title="Үргэлжлүүлэх" disabled={!phone || phone.length < 6} />}
          <AppButton onPress={handleCancel} style={Styles.bgGray} title="Цуцлах" />
        </KeyboardAvoidingView>
    </AppContent>
  );
}

export default DealerChargeScreen;
