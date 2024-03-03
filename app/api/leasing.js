import client from "./client";
import ConstantAPI from "./ConstantAPI";

const checkLeasing = (phone, register) =>
  client.get(
    ConstantAPI.PROVISION.API.CHECK_LEASING + `?number=${phone}&register=${register}`
  );

export default {
  checkLeasing,
};
