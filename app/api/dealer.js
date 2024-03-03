import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getDealerInfoByPhone = (branchPhone) =>
  client.get(
    ConstantAPI.REST.API.DEALER+
      "?branchPhone=" +
      branchPhone
  );

const getDealerInfoByCode = (dealerCode) =>
  client.get(
    ConstantAPI.REST.API.DEALER+
      "?dealerCode=" +
      dealerCode
  );

export default {
  getDealerInfoByPhone,
  getDealerInfoByCode,
};
