import React, { useState } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";

import provisionBill from "../../api/provisionBill";
import AppTextInfo from "../../components/AppTextInfo";
import AppPreview from "../../components/AppPreview";

function PostInfo({ parentState, onChangeState, route: { params } }) {
  const [info, setInfo] = useState();
  const { request: getBill, loading } = useApi(provisionBill.getBill);
  const amount = params.prodOpt?.price;
  parentState.prodOptId = params.prodOpt?.prodOptId;

  return (
    <>
      <AppLoader visible={loading} />
      {info && <AppTextInfo>{info}</AppTextInfo>} 
      {amount !== 0 ? (
        <AppPreview
          amount={amount}
          amountDescription="Төлөх дүн"
          title={parentState.isdn}
          titleDescription="Утасны дугаар"
        />
      ) : (
        <AppErrorMessage error="Үнийн мэдээлэл олдсонгүй." />
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

export default WithSale(PostInfo);
