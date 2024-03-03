import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getLastTransactions = (params) =>
  client.get(
    ConstantAPI.REST.API.LAST_TRANSACTION +
      "/transactions" +
      "?limit=" +
      params.limit +
      "&offset=" +
      params.offset
  );

const getPrintPriview = (id) =>
  client.get(
    ConstantAPI.REST.API.PRINT + `/${id}/print`
  );

export default {
  getLastTransactions,
  getPrintPriview
};
