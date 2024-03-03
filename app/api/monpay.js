import client from "./client";
import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const getToken = () =>
  client.get(
    ConstantAPI.REST.API.PRINT + `/${id}/print`
  );

const getMonpayWalletUrl = (data) =>
  clientPost.put(
    ConstantAPI.UPLOAD.API.WALLET_URL, data
  );
export default {
  getToken,
  getMonpayWalletUrl
};
