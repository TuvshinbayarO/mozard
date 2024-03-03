import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

// https://dealertest.mobicom.mn/api/d/provision-builtin/rest/ams/numberlimit?register=ЕЮ05310301
const numberLimit = (register) => clientPost.get(ConstantAPI.REST.API.NUMBER_LIMIT + `?register=${register}`);

export default {
  numberLimit,
};
