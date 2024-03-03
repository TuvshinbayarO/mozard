import { create } from "apisauce";
import authStorage from "../auth/storage";
import ConstantAPI from "./ConstantAPI";

const apiCient = create({
  withCredentials: true,
  baseURL: ConstantAPI.BASE_URL,
});
apiCient.addAsyncRequestTransform(async (request) => {
  const cookie = await authStorage.getCookie();
  if (!cookie) return;
  request.params["headers.Cookie"] = cookie;
  // request.headers["Cookie"] = cookie;
});

export default apiCient;
