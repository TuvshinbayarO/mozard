import React, { useState } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";
import AppPreview from "../../components/AppPreview";
import sell from "./../../api/sell";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";

function GsmCardScreen({ parentState, onChangeState, route: { params } }) {
  const [info, setInfo] = useState();
  const [payInfo, setPayInfo] = useState({
    amount: params.prodOpt?.price || params.option?.price,
    titleDescription: params.prodOpt?.prodOptName || params.option?.prodOptName,
  });
  const { request: getPreview, loading } = useApi(sell.preview);
  const amount = params.prodOpt?.price || params.option?.price || "";
  parentState.prodOptId = params.prodOpt?.prodOptId || params.option?.prodOptId;
  const prodName =
    params.prodOpt?.prodOptName ||
    params.option?.prodOptName ||
    "Утасны дугаар";

  const handlePress = (requestedIsdn) => {
    setPayInfo(null);
    const data = {
      ...parentState,
      autoVat: true,
      buhel: "",
      email: "nomail@nomail.mn",
      passRead: false,
      skipBO: true,
    };
    getPreview(data)
      .then((res) => {
        if (res.code !== 200) {
          setInfo(res.info || "Төлбөрийн мэдээлэл харуулах боломжгүй.1");
        } else {
          if (res.result.payAmount) {
            setPayInfo({
              amount: res.result.payAmount,
              isdn: res.result.isdn,
            });
            setInfo(null);
          } else {
            setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.2");
          }
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.3");
      });
  };

  return (
    <>
      <AppLoader visible={loading} />
      {info && <AppText style={[Styles.textRed]}>{info}</AppText>}
      {payInfo && (
        <AppPreview
          amount={payInfo.amount || ""}
          amountDescription="Төлөх дүн"
          title={payInfo.isdn}
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

export default WithSale(GsmCardScreen);
