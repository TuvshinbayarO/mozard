import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";

// https://dealertest.mobicom.mn/api/d/provision-builtin/rest/ams/register?register=ЕЮ05310301
const getCivildId = (register) => clientPost.get(ConstantAPI.PROVISION.API.CIVIL_ID + `?register=${register}`);

export default {
    getCivildId,
};
