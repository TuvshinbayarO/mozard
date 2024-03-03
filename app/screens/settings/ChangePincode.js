import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import pincodeApi from "../../api/pincode";
import AppTextInput from "../../components/AppTextInput";
import Styles from "../../resources/Styles";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import storage from "../../auth/storage";
import AppText from "../../components/AppText";
import { useNavigation } from "@react-navigation/core";

const { width } = Dimensions.get("window");

function ChangePincode(props) {
  const navigation = useNavigation();
  const [currentPincode, setCurrentPincode] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [confirmPincode, setConfirmPincode] = useState("");

  useEffect(async () => {
    pincodeApi.notNullPincode(await storage.get("username")).then((res) => {
      console.log("res.data================", res.data)
      if(res.data.code == 201) { // 201 bval nuuts ug uusguulne
        Alert.alert("Уучлаарай, Гүйлгээний нууц үг үүсээгүй байна.");
        navigation.navigate("pinRestore");
      }
    })
  },[])

  const onchangeCurrentPincode = (e) => {
    setCurrentPincode(e);
  };

  const onchangeNewPincode = (e) => {
    setNewPincode(e);
  };
  const onchangeConfirmPincode = (e) => {
    setConfirmPincode(e);
  };

  const handleSubmit = async (e) => {
    if(currentPincode == "") {
      Alert.alert("Одоогийн гүйлгээний нууц үг оруулна уу")
    } else if(currentPincode.length < 4) {
      Alert.alert("Одоогийн гүйлгээний нууц үгээ бүрэн оруулна уу")
    } else if (newPincode !== confirmPincode) {
      Alert.alert("Шинэ гүйлгээний нууц үг хоорондоо таарахгүй байна.");
    } else if(newPincode.length < 4) {
      Alert.alert("Гүйлгээний нууц үг 4 оронтой байх ёстой!")
    } else {
      const data = {
        pass: currentPincode,
        passNew: newPincode,
        username: await storage.get("username")
      };
      pincodeApi.changePincode(data).then((res) => {
        console.log("response:", res)
        Alert.alert("", res.data.info);
      });
    }
  };

  return (
    <AppContent>
      <Text
        style={[
          Styles.textDarkBlue,
          width > 700 ? Styles.text28 : Styles.text16,
          Styles.fontWeight400
        ]}
      >
        Гүйлгээний нууц үг солих
      </Text>
      <Text></Text>
      <View>
        <View>
          <AppText>Одоогийн нууц үг</AppText>
          <AppTextInput
            secureTextEntry={true}
            name="currentPincode"
            onChangeText={onchangeCurrentPincode}
            placeholder="Одоогийн гүйлгээний нууц үг"
            keyboardType="number-pad"
            maxLength={4}
          />
          <AppText>Шинэ нууц үг</AppText>
          <AppTextInput
            secureTextEntry={true}
            name="newPincode"
            onChangeText={onchangeNewPincode}
            placeholder="Шинэ гүйлгээний нууц үг"
            keyboardType="number-pad"
            maxLength={4}
          />
          <AppTextInput
            secureTextEntry={true}
            name="confirmPincode"
            onChangeText={onchangeConfirmPincode}
            placeholder="Шинэ гүйлгээний нууц үг давтах"
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>
        <AppButton onPress={handleSubmit} title="Солих"></AppButton>
      </View>
    </AppContent>
  );
}
export default ChangePincode;
