import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getSalesTxn = (params) =>
  client.get(ConstantAPI.REST.API.REPORT + "/sales/transactions?" + params);

const getPurchaseTxn = (params) =>
  client.get(ConstantAPI.REST.API.REPORT + "/purchase/transactions?" + params);

const getAccountTxn = (params) =>
  client.get(
    ConstantAPI.REST.API.ACCOUNT_INFO +
      "/transactions" +
      "?limit=" +
      params.limit +
      "&offset=" +
      params.offset
  );

const getProductList = () => client.get(ConstantAPI.REST.API.PRODUCTS);
const getOptionList = (productId) =>
  client.get(ConstantAPI.REST.API.OPTIONS + "/" + productId + "/options");

export default {
  getSalesTxn,
  getPurchaseTxn,
  getAccountTxn,
  getProductList,
  getOptionList,
};
