import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getPackss = (phone) => client.get(ConstantAPI.REST.API.PACKS + `/${phone}/services/657/fields/2131/attributes/19758`);
const getHybPackss = (phone) => client.get(ConstantAPI.REST.API.PACKS + `/${phone}/services/837/fields/5505/attributes/33057`);

export default {
  getPackss,
  getHybPackss
};
