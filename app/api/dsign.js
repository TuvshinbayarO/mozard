import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

const dsign = (data) => clientPost.get(ConstantAPI.REST.API.DSIGN + `/${data.isdn}/register/${data.register}`, console.log('data===========Req', data));

export default {
  dsign,
};
