import { create } from "apisauce";
import authStorage from "../auth/storage";
import { encode as btoa } from "base-64";
import ConstantAPI from "./ConstantAPI";

const apiCient = create({
  withCredentials: true,
  baseURL: ConstantAPI.PROVISION.API.URL,
});
apiCient.addAsyncRequestTransform(async (request) => {
  const authUser = await authStorage.getUser();
  if (!authUser) return;
  request.headers["Authorization"] =
    "Basic " + btoa(authUser.username + ":" + authUser.password);
  request.headers["channel"] = "dealer app";
  request.headers["X-Channel"] = "dealer app";
});
export default apiCient;
