// import clientPost from "./clientPost";
import ConstantAPI from "./ConstantAPI";
import apiUploadPost from "./uploadPost";
import {Buffer} from 'buffer'

const uploadFile = (data) => apiUploadPost.post(ConstantAPI.PROVISION.API.FILE_UPLOAD + `?type=jpg`, Buffer.from(data.base64, 'base64'));
// const uploadFile = (data) => apiUploadPost.post(ConstantAPI.PROVISION.API.FILE_UPLOAD + `?type=jpg`,data , console.log('datadatadatadatadatadatadata'), data);

export default {
  uploadFile,
};
