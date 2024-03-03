import clientLogin from "./clientLogin";
import ConstantAPI from "./ConstantAPI";
import { encode as btoa } from "base-64";
import qs from 'qs';

const login = (username, password) => {
  clientLogin.addAsyncRequestTransform(async (request) => {
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
  });

  return clientLogin.post(
    // ConstantAPI.REST.API.LOGIN + "?username=" + username + "&password=" + password + "&channel=app"
    '/api/login', "username="+username+"&password="+password+"&channel=dealer+app&continue=OK"
  );
};

const logout = async () => {
  clientLogin.addAsyncRequestTransform(async (request) => {
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
  });

  return clientLogin.get('/api/logout');
};

export default {
  login,
  logout
};
