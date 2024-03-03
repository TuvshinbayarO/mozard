import { useContext } from "react";
import authApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

export default () => {
  const { user, setUser, setActiveTimer } = useContext(AuthContext);

  const login = (user) => {
    setUser(user);
    setActiveTimer(7200000); // Session time const // 2tsag  7200000
    authStorage.storeUser(user);
    console.log("Auth user", user);
  };

  const logout = async () => {
    setUser(null);
    await authStorage.removeCookie();
    await authStorage.removeUser();
    console.log("logout function");
    authApi.logout();
  };

  const saveCookie = (data) => {
    authStorage.storeCookie(data);
    console.log("Auth cookie stored", data);
  };

  return { user, logout, login, saveCookie };
};
