// import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";
import {Buffer} from 'buffer'
import apiSignatureUploadPost from "./uploadSignaturePost";

// const signatureUploadFile = (data) => apiSignatureUploadPost.post(ConstantAPI.PROVISION.API.FILE_UPLOAD + `?tosms=true`, data);
const signatureUploadFile = (data) => apiSignatureUploadPost.post(ConstantAPI.PROVISION.API.FILE_UPLOAD + `?type=png` + `&approval=true`, Buffer.from(data.base64, 'base64'));
// https://dealertest.mobicom.mn/api/d/dealer-api/rest/file/upload?tosms=
export default {
    signatureUploadFile,
};
