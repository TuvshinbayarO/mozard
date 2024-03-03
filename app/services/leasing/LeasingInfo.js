import React from "react";
import WithSale from "../hoc/withSale";
import { useEffect } from "react";
import AppPreview from "../../components/AppPreview";
import AppErrorMessage from "../../components/forms/AppErrorMessage";

function LeasingInfo({ parentState, onChangeState, route: { params } }) {
  const isdn = params.isdn;
  const amount = params.amount;

  useEffect(() => {
    parentState.prodOptId = params.prodOptId;
    parentState.isdn = params.isdn;
    parentState.register = params.register;
    parentState.fname = params.fname;
    parentState.lname = params.lname;
    parentState.files = params.files;
    parentState.contractpath = params.contractpath;
    parentState.get_mez = params.get_mez;
    parentState.buhel = params.buhel;
    parentState.passRead = params.passRead;
    parentState.paymentType = params.paymentType;
    parentState.skipBO = params.skipBO;
    parentState.amount = amount.toString();
  }, []);

  return (
    <>
      {isdn ? (
        <>
          <AppPreview
            amount={amount}
            amountDescription="Төлөх дүн"
            title={isdn}
            titleDescription="Утасны дугаар"
          />
        </>
      ) : (
        <AppErrorMessage error="Үнийн мэдээлэл олдсонгүй." />
      )}
    </>
  );
}

export default WithSale(LeasingInfo);
