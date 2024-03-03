import React, { useEffect } from "react";
import WithSale from "../hoc/withSale";
import AppPreview from "../../components/AppPreview";
import { AppErrorMessage } from "../../components/forms";

function GsmSimInfo({ parentState, onChangeState, route: { params } }) {
  const amount = params.productPrice;
  const isdn = params.isdn;
  const promoPrice = params.promoPrice;
  const promoDesc = params.promoDesc;

  useEffect(() => {
    parentState.prodOptId = params.prodOptId;
    parentState.firstname = params.firstname;
    parentState.lastname = params.lastname;
    parentState.register = params.register;
    parentState.invIds = params.invIds;
    parentState.invUid = params.invUid;
    parentState.isdn = params.isdn;
    parentState.files = params.files;
    parentState.get_mez = params.get_mez;
    parentState.skipBO = params.skipBO
    parentState.contractpath = params.contractpath;
    parentState.isForeigner = params.isForeigner;
    parentState.gsignread = params.gsignread
  }, []);

  return (
    <>
      <AppPreview
        amount={amount}
        amountDescription="Төлөх дүн"
        title={isdn}
        titleDescription="Утасны дугаар"
        promoPrice={promoPrice}
        promoDesc={promoDesc}
      />
    </>
  );
}

export default WithSale(GsmSimInfo);
