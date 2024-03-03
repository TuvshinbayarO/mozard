import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getPromos = () => client.get(ConstantAPI.REST.API.PROMO_LIST);

export default {
  getPromos,
};
