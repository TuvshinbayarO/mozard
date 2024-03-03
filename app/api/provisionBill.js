import client from "./clientProvision";
import ConstantAPI from "./ConstantAPI";

const getBill = (isdn) =>
  client.get(
    ConstantAPI.PROVISION.API.BILL + "/sms?number=" + encodeURIComponent(isdn)
  );

const getPostBill = (data) =>
  client.get(
    ConstantAPI.PROVISION.API.POST_BILL +
      "/sms?number=" +
      encodeURIComponent(data.isdn)
  );

export default {
  getBill,
  getPostBill,
};
