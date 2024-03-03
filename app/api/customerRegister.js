import useUtils from "../hooks/useUtils";
import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getCustomerRegister = (phone) =>
  client.get(ConstantAPI.PROVISION.API.CUSTOMER_REGISTER + "?number=" + phone);

const getAmsUser = (phone) =>
  client.get(ConstantAPI.PROVISION.API.AMS_USER + "?number=" + phone);

const numberChangeStatus = (isdn) =>
  client.get(ConstantAPI.PROVISION.API.CHANGE_STATUS + "?number=" + isdn);

const getRateplans = (item) =>
  client.get(ConstantAPI.PROVISION.API.RATEPLANS + `?number=${item.isdn}&register=${item.register}&isForeigner=${item.isForeigner}`);

const getPostField = (item) => client.get(ConstantAPI.PROVISION.API.POST_FIELD + `/${item.number}/services/837/fields`) //657
const numberChangeStatus2 = (params) =>
  client.get(ConstantAPI.PROVISION.API.CHANGE_STATUS + `?number=${params.number}&orderName=${params.register}&rateplan=${params.selectedPackage}`);

const getCivilId = (register) =>
  client.get(ConstantAPI.PROVISION.API.CIVIL_ID + "?register=" + register);

const getNumberLimit = (register) =>
  client.get(ConstantAPI.PROVISION.API.cd + "?register=" + register);

export default {
  getCustomerRegister,
  getAmsUser,
  numberChangeStatus,
  getRateplans,
  numberChangeStatus2,
  getNumberLimit, 
  getPostField,
  getCivilId
};
