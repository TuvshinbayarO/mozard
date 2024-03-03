import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";
import client from "./client";
// https://dealertest.mobicom.mn/api/d/dealer-api/rest/branches/passtxn/set?passNew=0000&username=enabling
//https://dealertest.mobicom.mn/api/d/dealer-api/rest/branches/passtxn/set?username=enabling&pass=1234&passnew=1234
// /api/d/dealer-api/rest/branches/passtxn/set?username=enabling&pass=1234&passnew=1234
const changePincode = (param) => clientPost.put(ConstantAPI.REST.API.PINCODE_CHANGE + `?username=${param.username}&pass=${param.pass}&passnew=${param.passNew}`);
// https://dealer.mobicom.mn/api/d/dealer-api/rest/branches/passtxn/check?pass=1234&username=enabling
const checkPincode = (param) => clientPost.get(ConstantAPI.REST.API.PINCODE_CHECK + `?pass=${param.pass}&username=${param.username}`);
const restorePincode = (param) => clientPost.put(ConstantAPI.REST.API.PINCODE_RESTORE + `?username=${param.username}&passnew=${param.passNew}`);
const notNullPincode = (param) => clientPost.get(ConstantAPI.REST.API.NOT_NULL_PINCODE + `?username=${param}`);
  export default {
  changePincode,
  restorePincode,
  checkPincode, 
  notNullPincode
};
 