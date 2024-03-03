import React, { useEffect } from "react";
import WithSale from "../hoc/withSale";
import AppPreview from "../../components/AppPreview";
import AppErrorMessage from "../../components/forms/AppErrorMessage";

function GsmNumberInfo({ parentState, route: { params } }) {
  const amount = params.productPrice;
  const isdn = params.isdn;
  const rateplan = params.rateplan;
  const promoPrice = params.promoPrice;
  const promoDesc = params.promoDesc;

  useEffect(() => {
    parentState.prodOptId = params.prodOptId;
    parentState.isdn = params.isdn;
    parentState.rateplan = params.rateplan;
    parentState.isForeigner = params.isForeigner;
    parentState.register = params.register;
    parentState.fname = params.fname;
    parentState.lname = params.lname;
    parentState.city = params.city;
    parentState.district = params.district;
    parentState.khoroo = params.khoroo;
    parentState.apartment = params.apartment;
    parentState.build = params.build;
    parentState.email = params.email;
    parentState.contact1name = params.contact1name;
    parentState.contact1phone = params.contact1phone;
    parentState.invIds = params.invIds;
    parentState.invUid = params.invUid;
    parentState.files = params.files;
    parentState.buhel = params.buhel;
    parentState.passRead = params.passRead;
    parentState.paymentType = params.paymentType;
    parentState.skipBO = params.skipBO;
    parentState.civilId = params.civilId;
    parentState.contractpath = params.contractpath;
    parentState.get_mez = params.get_mez;
    // parentState.gender = params.gender
    parentState.channel = params.channel;
    parentState.amount = amount.toString();
    parentState.parent1 = params.parent1;
    parentState.parent2 = params.parent2;
    parentState.gsignread = params.gsignread;
  }, []);

  return (
    <>
      {amount ? (
        <AppPreview
          amount={amount}
          amountDescription="Төлөх дүн"
          title={isdn}
          titleDescription={rateplan}
          promoPrice={promoPrice}
          promoDesc={promoDesc}
        />
      ) : (
        <AppErrorMessage error="Үнийн мэдээлэл олдсонгүй." />
      )}
    </>
  );
}

export default WithSale(GsmNumberInfo);
