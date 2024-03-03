import React, { useState } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import passwordApi from "../../api/password";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import AppContent from "../../components/AppContent";
import Styles from "../../resources/Styles";

const { width } = Dimensions.get("window");

function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onchangePassword = (e) => {
    setPassword(e);
  };
  const onchangeNewPassword = (e) => {
    setNewPassword(e);
  };
  const onchangeConfirmPassword = (e) => {
    setConfirmPassword(e);
  };

  const handleSubmit = (e) => {
    if (newPassword !== confirmPassword) {
      Alert.alert("", "Шинэ нууц үг хоорондоо таарахгүй байна.");
    } else {
      const data = {
        password: password,
        newPassword: newPassword,
      };
      passwordApi.changePassword(data).then((res) => {
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
          Нэвтрэх нууц үг солих
        </Text>
        <Text></Text>
        <View >
          <AppTextInput
            secureTextEntry={true}
            name="password"
            onChangeText={onchangePassword}
            placeholder="Хуучин нууц үг"
          />
          <AppTextInput
            secureTextEntry={true}
            name="newPassword"
            onChangeText={onchangeNewPassword}
            placeholder="Шинэ нууц үг"
          />
          <AppTextInput
            secureTextEntry={true}
            name="confirmPassword"
            onChangeText={onchangeConfirmPassword}
            placeholder="Шинэ нууц үг давтах"
          />
        </View>
          <AppButton onPress={handleSubmit} title="Солих"></AppButton>
    </AppContent>
  );
}

export default ChangePassword;
