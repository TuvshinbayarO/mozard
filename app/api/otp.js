import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const sendOtp = (params) => clientPost.get(ConstantAPI.PROVISION.API.TAN_CREATE + `?isdn=${params.isdn}`);
const checkOtp = (params) => clientPost.get(ConstantAPI.PROVISION.API.TAN_CONFIRM + `?isdn=${params.isdn}&tan=${params.otp}`);
export default {
  sendOtp,
  checkOtp
};
