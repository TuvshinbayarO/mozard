import client from "./clientProvision";
import ConstantAPI from "./ConstantAPI";

const checkUser = (username) =>
  client.get(
    ConstantAPI.PROVISION.API.HBB + "/bundleinquiry?" + username
  );

export default {
  checkUser,
};
