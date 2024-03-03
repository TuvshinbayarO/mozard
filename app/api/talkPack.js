import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getTalkPackss = (phone) => client.get(ConstantAPI.REST.API.PACKS + `/${phone}/services/657/fields/5507/attributes/15264`);

export default {
  getTalkPackss,
};
