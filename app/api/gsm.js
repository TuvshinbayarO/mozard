import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const confirmPost = (data) => {
    return clientPost.post(ConstantAPI.REST.API.CONFIRM_POST, data)
};
export default confirmPost  