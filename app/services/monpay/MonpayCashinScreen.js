import React, { useState } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import sell from "../../api/sell";
import AppPreview from "../../components/AppPreview";
import AppButton from "../../components/AppButton";
import AppContent from "../../components/AppContent";
import { KeyboardAvoidingView, Text, View, Dimensions } from "react-native";
import Styles from "../../resources/Styles";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

function MonpayCashinScreen({ parentState, onChangeState, route: { params } }) {
  const { navigate } = useNavigation();
  const [info, setInfo] = useState();
  const [preview, setPreview] = useState();
  const [isdn, setIsdn] = useState();
  const [amount, setAmount] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { request: getBillPreview, loading } = useApi(sell.preview);
  const { request: getBillConfirm, loading: confirmLoading } = useApi(sell.confirm);

  const handlePressContinue = () => {
    setPreview(null);
    if (isdn === undefined || isdn === "")
      return Alert.alert("Утасны дугаараа оруулна уу !");
    if (amount === undefined || amount === "")
      return Alert.alert("Төлбөрийн дүнгээ оруулна уу !");

    const data = {
      prodOptId: params.option.prodOptId,
      autoVat: true,
      buhel: '',
      email: 'nomail@nomail.mn',
      passRead: false,
      skipBO: true,
      description: "Cash out",
      isdn,
      amount
    };
    getBillPreview(data)
      .then((response) => {
        if (response.code === 200) {
          setPreview({ isdn: response.result.isdn, amount: response.result.payAmount });
          setInfo(null);
          setIsChecked(true);
        } else if (response.code === 400) {
          setInfo(response.info ? response.info : "Төлбөрийн мэдээлэл харуулах боломжгүй.")
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };

  const handlePressConfirm = () => {
    const data = {
      prodOptId: params.option.prodOptId,
      autoVat: true,
      buhel: '',
      email: 'nomail@nomail.mn',
      passRead: false,
      skipBO: true,
      description: "Cash out",
      isdn,
      amount
    };
    getBillConfirm(data)
      .then((response) => {
        if (response.code === 200) {
          setPreview({ isdn: response.result.isdn, amount: response.result.payAmount });
          setInfo(null);
          setIsChecked(true);
        } else if (response.code === 400) {
          setInfo(response.info ? response.info : "Гүйлгээ хийхэд алдаа гарлаа.");
          setIsChecked(false);
        }
      })
      .catch((error) => {
        setInfo("Гүйлгээ хийхэд алдаа гарлаа.");
        setIsChecked(false);
      });
  }

  const handleCancel = () => {
    navigate("Home", {screen: "Product"});
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
          Monpay дансанд мөнгө хийх
        </Text>
        <Text></Text>
        {info &&
          <Text style={[Styles.textRed]}>{info}</Text>
        }
        {preview && (
          <View style={[{height: 120}]}>
            <AppPreview
              amount={preview.amount}
              amountDescription="Төлбөрийн дүн"
              title={preview.isdn}
              titleDescription="Утасны дугаар"
            />
          </View>
        )}
        <AppTextInput
          icon="search"
          onChangeText={isdn => setIsdn(isdn)}
          label="Утасны дугаар"
          keyboardType="numeric"
          autoFocus
          value={isdn}
          maxLength={8}
        />
        <AppTextInput
          onChangeText={amount => setAmount(amount)}
          label="Төлбөрийн дүнгээ оруулна уу"
          keyboardType="numeric"
          value={amount}
        />
        {!isChecked && (
          <AppButton onPress={handlePressContinue} title="Үнэ бодох" disabled={!isdn || !amount || isdn.length < 8} />
        )}
        {isChecked && (
          <AppButton onPress={handlePressConfirm} title="Гүйлгээ хийх" />
        )}
        <AppButton onPress={handleCancel} style={Styles.bgGray} title="Цуцлах" />
      </KeyboardAvoidingView>
    </AppContent>
  );
}

export default MonpayCashinScreen;
