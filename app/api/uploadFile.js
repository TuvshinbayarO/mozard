import client from "./client";
import ConstantAPI from "./ConstantAPI";
import uploadPost from "./uploadPost"
import {Buffer} from 'buffer'


const upload = (data) => uploadPost.post(ConstantAPI.PROVISION.API.FILE_UPLOAD + `?type=jpg`, Buffer.from(data.base64, 'base64'));

export default {
  upload
};
