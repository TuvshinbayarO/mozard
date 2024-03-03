import React, { useEffect } from "react";
import WithSale from "../hoc/withSale";
import AppPreview from "../../components/AppPreview";
import { AppErrorMessage } from "../../components/forms";

function GsmPostInfo({ parentState, onChangeState, route: { params } }) {
  const amount = params.productPrice;
  const isdn = params.isdn;
  const promoPrice = params.promoPrice;
  var jsonFields = {};

  useEffect(() => {
    parentState.prodOptId = params?.prodOptId;
    parentState.isdn = params?.isdn;
    parentState.rateplan = params?.rateplan;
    parentState.isForeigner = params?.isForeigner;
    parentState.register = params?.register;
    parentState.email = params?.email;
    parentState.Signature = params?.Signature;
    parentState.invIds = params?.invIds;
    parentState.invUid = params?.invUid;
    parentState.files = params?.files;
    parentState.buhel = params?.buhel;
    parentState.civilId = params?.civilId;
    parentState.passRead = params?.passRead;
    parentState.paymentType = params?.paymentType;
    parentState.skipBO = params?.skipBO;
    parentState.amount = "0";
    parentState.channel = "dealerapp"

    parentState.amount = amount.toString();
    if (params.fields) {
      jsonFields['2051'] = params?.fields?.creditPackId
      jsonFields['2131'] = params?.fields?.dataPackId
      jsonFields['2132'] = params?.fields?.talkPackId
      jsonFields['5509'] = params?.fields?.salesPackId

      if (params.passRead == true) {
        parentState.fname = params?.fname;
        parentState.lname = params?.lname;
        parentState.city = params?.city;
        parentState.district = params?.district;
        parentState.khoroo = params?.khoroo;
        parentState.apartment = params?.apartment;
        parentState.build = params?.build;
        jsonFields['712'] = params?.fields?.lastname
        jsonFields['714'] = params?.fields?.firstname
        jsonFields['5495'] = params?.fields?.aimagCityName
        jsonFields['5497'] = params?.fields?.soumDistrictName
        jsonFields['5499'] = params?.fields?.bagKhorooName
        jsonFields['5501'] = params?.fields?.addressStreetName
        jsonFields['5503'] = params?.fields?.addressDetail
      } else if (params.passRead == false) {
        parentState.fname = params?.fname;
        parentState.lname = params?.lname;
        parentState.city = params?.city;
        parentState.district = params?.district;
        parentState.khoroo = params?.khoroo;
        parentState.apartment = params?.apartment;
        parentState.build = params?.build;
        jsonFields['712'] = params?.fields?.lname
        jsonFields['714'] = params?.fields?.fname
        jsonFields['5495'] = params?.fields?.city
        jsonFields['5497'] = params?.fields?.district
        jsonFields['5499'] = params?.fields?.khoroo
        jsonFields['5501'] = params?.fields?.apartment
        jsonFields['5503'] = params?.fields?.door
      }
      jsonFields['715'] = params?.fields?.register
      jsonFields['6014'] = params?.fields?.civilId
      jsonFields['718'] = params?.fields?.email ? params?.fields?.email : "nomail@nomail.mn"
      jsonFields['908'] = params?.fields?.imsi
      jsonFields['2031'] = params?.fields?.phone
      jsonFields['2046'] = params?.fields?.billType ? params?.fields?.billType : "18129"
      jsonFields['2103'] = params?.fields?.contactNumber
      jsonFields['2104'] = params?.fields?.contactNumber2
      jsonFields['2105'] = params?.fields?.contactName
      jsonFields['2106'] = params?.fields?.contactName2
      jsonFields['2645'] = params?.fields?.contactRel
      jsonFields['2646'] = params?.fields?.contactRel2
      jsonFields['5505'] = params?.fields?.simId
      jsonFields['5967'] = params?.fields?.infoChannel
      jsonFields['2434'] = params?.fields?.documentType

      if (params?.fields?.simId.value == "33057") {
        jsonFields['5507'] = { value: params?.fields?.simTypeId }
      }
      if (params?.fields?.simId.value == "36973") {
        jsonFields['5980'] = { value: params?.fields?.simTypeId }
      }
    }
    parentState.fields = jsonFields;
  }, []);

  return (
    <>
      <AppPreview
        amount={amount}
        amountDescription="Төлөх дүн"
        title={isdn}
        titleDescription="Утасны дугаар"
        promoPrice={promoPrice}
        promoDesc=""
      />
    </>
  );
}

export default WithSale(GsmPostInfo);
