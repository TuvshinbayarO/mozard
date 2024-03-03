import useUtils from "../hooks/useUtils";
import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getProducts = (params) => {
  const { queryBuilder } = useUtils();
  return client.get(
    ConstantAPI.REST.API.PRODUCT_LIST + "?" + queryBuilder(params)
  );
};

const getProductOptions = (productId) =>
client.get(
    ConstantAPI.REST.API.PRODUCT_LIST +
      "/" +
      encodeURIComponent(productId) +
      "/options"
  );
const getInventories = (params) => {
  const { queryBuilder } = useUtils();
  return client.get(
    ConstantAPI.REST.API.INVENTORY + "?" + queryBuilder(params)
  );
};

export default {
  getProducts,
  getProductOptions,
  getInventories,
};
