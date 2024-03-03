import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getAccountInfo = () => client.get(ConstantAPI.REST.API.ACCOUNT_INFO);

const getSalesInfo = () => client.get(ConstantAPI.REST.API.REPORT + "/sales");

const getPurchaseInfo = () => client.get(ConstantAPI.REST.API.REPORT + "/purchase");
const getRecentInfo = () => client.get(ConstantAPI.REST.API.RECENT);
const getIsdn = (params) => client.get(ConstantAPI.REST.API.ISDN + `?username=${params.username}`)
export default {
  getAccountInfo,
  getSalesInfo,
  getPurchaseInfo,
  getRecentInfo, 
  getIsdn
};
