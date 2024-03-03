import { useContext, useState } from "react";
import UserInfoContext from "../auth/userInfo";

export default () => {
  const {userInfo, setUserInfo } = useContext(UserInfoContext);

  const setUserData = (state) => (value) => {
    setUserInfo({
      ...userInfo,
      [state]: value,
    });
  };
  const delUserData = (name) => {
    const tmpInfo = { ...userInfo };
    if (name in tmpInfo) delete tmpInfo[name];
    setUserInfo(tmpInfo);
  };
  const resetUserData = () => setUserInfo({});
  
  return { userData: userInfo, setUserData, delUserData, resetUserData }
};
