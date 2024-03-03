import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const postContract = (data) => clientPost.get(ConstantAPI.REST.API.CONTRACT_POST);

export default {
  postContract,
};
