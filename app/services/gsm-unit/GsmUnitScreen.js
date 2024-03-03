import React, { useState } from "react";
import { Alert } from "react-native";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";
import sell from "../../api/sell";
import AppPreview from "../../components/AppPreview";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";

function GsmUnitScreen({ parentState, onChangeState }) {
  const [info, setInfo] = useState();
  const [preview, setPreview] = useState();
  const { request: getBill, loading } = useApi(sell.preview);

  const handlePress = (requestedIsdn) => {
    setPreview(null);
    if (requestedIsdn === undefined || requestedIsdn === "")
      return Alert.alert("Цэнэглэх дугаараа оруулна уу !");
    
    const data = {
      ...parentState,
      autoVat: true,
      buhel: '',
      email: 'nomail@nomail.mn',
      passRead: false,
      skipBO: true
    };
    getBill(data)
      .then((response) => {
        if (response.code === 200) {
          setPreview({ isdn: response.result.isdn, amount: response.result.payAmount });
          // onChangeState("amount")(response.result.payAmount);
        } else {
          setInfo(response.info ? response.info : "Төлбөрийн мэдээлэл харуулах боломжгүй.");
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };
  return (
    <>
      <AppLoader visible={loading} />
      {info && <AppText style={Styles.textRed}>{info}</AppText>}
      {preview && (
        <AppPreview
          amount={preview.amount}
          amountDescription="Төлбөрийн дүн"
          title={preview.isdn}
          titleDescription="Утасны дугаар"
        />
      )}
      <AppTextInput
        icon="search"
        onChangeText={onChangeState("isdn")}
        onPress={() => handlePress(parentState.isdn)}
        label="Цэнэглэх утасны дугаар"
        keyboardType="numeric"
        autoFocus
        value={parentState.isdn}
      />
      <AppTextInput
        onChangeText={onChangeState("amount")}
        label="Нэгжийн дүнгээ оруулна уу"
        keyboardType="numeric"
        value={parentState.amount}
      />
    </>
  );
}

export default WithSale(GsmUnitScreen);
