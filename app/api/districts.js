import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getDistricts = (cityId) => client.get(ConstantAPI.REST.API.DISTRICTS + "?cityId="+cityId);

export default {
  getDistricts,
};
