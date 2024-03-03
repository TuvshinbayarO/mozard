import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const changePassword = (productId) =>
  clientPost.put(ConstantAPI.REST.API.PASSWORD, productId);

export default {
  changePassword,
};
