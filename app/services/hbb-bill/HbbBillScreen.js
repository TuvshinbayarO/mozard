import React, { useState } from "react";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";
import sell from "../../api/sell";
import AppText from "../../components/AppText";
import AppLoader from "../../components/AppLoader";
import AppPreview from "../../components/AppPreview";
import Styles from "../../resources/Styles";

function HbbBillScreen({ parentState, onChangeState, route: { params } }) {
  const [info, setInfo] = useState();
  const [preview, setPreview] = useState();
  const { request: getBill, loading } = useApi(sell.preview);
  parentState.prodOptId = params.prodOpt?.prodOptId || params.option?.prodOptId;

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
          setPreview({ isdn: requestedIsdn, amount: response.result.payAmount });
          // onChangeState("amount")(response.result.payAmount);
          setInfo(null);
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
        label="Төлбөр төлөх дугаар"
        onPress={() => handlePress(parentState.isdn)}
        keyboardType="numeric"
        autoFocus
        value={parentState.isdn}
      />
      <AppTextInput
        onChangeText={onChangeState("amount")}
        label="Төлбөрийн дүнгээ оруулна уу"
        keyboardType="numeric"
        value={parentState.amount}
      />
    </>
  );
}

export default WithSale(HbbBillScreen);
