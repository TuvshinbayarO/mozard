import React, { useState } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";
import AppTextInfo from "../../components/AppTextInfo";
import AppPreview from "../../components/AppPreview";
import mnp75 from "../../api/mnp75";
import AppText from "../../components/AppText";
import Styles from "../../resources/Styles";

function GsmDataScreen({ parentState, onChangeState, route: { params } }) {
  const [info, setInfo] = useState();
  const [payInfo, setPayInfo] = useState({amount: params.prodOpt?.price || params.option?.price});
  const { request: getPreview, loading } = useApi(mnp75.getPreview);
  parentState.prodOptId = params.prodOpt?.prodOptId || params.option?.prodOptId;
  const prodName = params.prodOpt?.prodOptName || params.option?.prodOptName || "Утасны дугаар";
  
  const handlePress = (requestedIsdn) => {
    setPayInfo(null);
    const data = {
      ...parentState,
      autoVat: true,
      buhel: '',
      email: 'nomail@nomail.mn',
      passRead: false,
      skipBO: true
    };
    getPreview(data).then(res => {
      if (res.code !== 200) {
        setInfo(res.info || 'Төлбөрийн мэдээлэл харуулах боломжгүй.');
      } else {
        if (res.code === 200) {
            setPayInfo({
              amount: res.result.payAmount,
              isdn: res.result.isdn
            });
            // setParams("btnShow")(true);
            setInfo(null);
        } else {
          setInfo(res.info ? res.info : "Төлбөрийн мэдээлэл харуулах боломжгүй.");
        }
      }
    }).catch((error) => {
      setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
    });
  };

  return (
    <>
      <AppLoader visible={loading} />
      {info && <AppText style={Styles.textRed}>{info}</AppText>}
      {payInfo && (
        <AppPreview
          amount={payInfo.amount || ''}
          amountDescription="Төлөх дүн"
          title={payInfo.isdn || parentState.isdn}
          titleDescription={prodName}
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
    </>
  );
}

export default WithSale(GsmDataScreen);
