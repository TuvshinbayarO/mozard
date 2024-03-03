import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getDataPackss = (phone) => client.get(ConstantAPI.REST.API.PACKS + `/${phone}/services/657/fields/2132/attributes/19763`);

export default {
  getDataPackss,
};
