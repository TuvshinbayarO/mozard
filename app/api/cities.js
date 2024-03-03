import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getCities = () => client.get(ConstantAPI.REST.API.CITIES);

export default {
  getCities,
};
