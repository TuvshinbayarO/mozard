import { create } from "apisauce";
import authStorage from "../auth/storage";
import ConstantAPI from "./ConstantAPI";

const apiUploadPost = create({
  withCredentials: false,
  baseURL: ConstantAPI.BASE_URL,
});
apiUploadPost.addAsyncRequestTransform(async (request) => {
  const cookie = await authStorage.getCookie();
  if (!cookie) return;
  request.headers["Cookie"] = cookie;
  request.headers["Accept"] = 'application/json';
  request.headers["Content-Type"] = 'image/jpg'
});

export default apiUploadPost;
