import client from "./client";
import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const preview = (params) =>
  clientPost.post(ConstantAPI.PROVISION.API.PREVIEW, params);

const confirm = (params) =>
  clientPost.post(ConstantAPI.PROVISION.API.CONFIRM, params);

const cashout = (params) =>
  client.get(ConstantAPI.PROVISION.API.MONPAY, params);

export default {
  preview,
  confirm,
  cashout
};
