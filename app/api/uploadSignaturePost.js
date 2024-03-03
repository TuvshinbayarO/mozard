import { create } from "apisauce";
import authStorage from "../auth/storage";
import ConstantAPI from "./ConstantAPI";

const apiSignatureUploadPost = create({
  withCredentials: false,
  baseURL: ConstantAPI.BASE_URL,
});
apiSignatureUploadPost.addAsyncRequestTransform(async (request) => {
  const cookie = await authStorage.getCookie();
  if (!cookie) return;
  request.headers["Cookie"] = cookie;
  request.headers["Accept"] = 'application/json';
  request.headers["Content-Type"] = 'multipart/form-data'
});

export default apiSignatureUploadPost;
