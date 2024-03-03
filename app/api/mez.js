import client from "./client";
import ConstantAPI from "./ConstantAPI";

const mezPreview = (register, lname, fname, signaturePath, foreigner) =>
  client.get(
    // ?register=МИ99081111&lname=Batbayar&fname=Tsogtbayar
    ConstantAPI.PROVISION.API.MEZ_PREVIEW + `?register=${register}&lname=${lname}&fname=${fname}&signaturePath=${signaturePath}&foreigner=${foreigner}`
  );

export default {
    mezPreview,
};
