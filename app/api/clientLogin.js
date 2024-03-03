import { create } from "apisauce";
import ConstantAPI from "./ConstantAPI";

const apiClientLogin = create({
  withCredentials: true,
  baseURL: ConstantAPI.LOGIN_URL
});

export default apiClientLogin;
