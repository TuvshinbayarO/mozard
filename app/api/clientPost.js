import { create } from "apisauce";
import authStorage from "../auth/storage";
import ConstantAPI from "./ConstantAPI";

const apiCientPost = create({
  withCredentials: false,
  baseURL: ConstantAPI.BASE_URL,
});
apiCientPost.addAsyncRequestTransform(async (request) => {
  const cookie = await authStorage.getCookie();
  if (!cookie) return;
  request.headers["Cookie"] = cookie;
});

export default apiCientPost;
