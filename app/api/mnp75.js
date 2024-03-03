import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const getPreview = (data) =>
  clientPost.post(ConstantAPI.REST.API.PRODUCT_PREVIEW, data);
  
export default {
  getPreview,
};
