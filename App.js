import React, { useState, useEffect } from "react";
import { LogBox, Alert, Text } from "react-native";
import authApi from "./app/api/auth";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import authStorage from "./app/auth/storage";
import AuthNavigator from "./app/navigation/AuthNavigator";
import * as Linking from "expo-linking";
import AuthContext from "./app/auth/context";
import storage from "./app/auth/storage";
import codePush from "react-native-code-push";
import useCodePush from "./app/hooks/useCodePush";
import CodePushLoading from "./codePush";

const DEFAULT_PERIOD = 1000;

const prefix = Linking.makeUrl("/");

const App = () => {
  const { progress, syncMessage } = useCodePush();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState();
  const [activeTimer, setActiveTimer] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [data, setdata] = useState(null);

  LogBox.ignoreAllLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
  ]);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: { path: "home" },
        Payment: { path: "payment" },
        // GSIGN: {path: "GSIGN"},
        // GsmNumber: {path: "GsmNumber"}
      },
    },
  };

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setdata(data);
  };

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setdata(Linking.parse(initialURL));
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  const getLoginInfo = async () => {
    let uname = await storage.get("username");
    let pass = await storage.get("password");
    await authApi.login(uname, pass);
    let userIn = await storage.getUser();
    setUser(userIn);
  };

  useEffect(() => {
    if (!user) {
      getLoginInfo();
    } else {
      console.log("User already exists:", user);
    }
  }, [user]);

  const restoreUser = async () => {
    const authUser = await authStorage.getUser();
    if (!authUser) return;
    setUser(authUser);
  };

  useEffect(() => {
    let timeOut = null;
    if (user) {
      timeOut = setTimeout(() => {
        if (activeTimer > 0) {
          setActiveTimer((prev) => prev - 2000);
        } else {
          setUser(null);
          authStorage.removeCookie();
          authStorage.removeUser();
          authApi.logout();
        }
      }, DEFAULT_PERIOD);
    }
    return () => clearTimeout(timeOut);
  }, [user, activeTimer]);

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.log}
      />
    );
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        status,
        setStatus,
        activeTimer,
        setActiveTimer,
      }}
    >
      <OfflineNotice />
<<<<<<< HEAD
      {progress || syncMessage ? (
        <CodePushLoading progress={progress} subHeader={syncMessage} />
      ) : (
        <NavigationContainer linking={linking}>
          {/* <Text> */}
          {/* {data ? JSON.stringify(data): "app not opened from deeplink"} */}
          {/* </Text> */}
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
=======
      {
        progress || syncMessage ? (
          <CodePushLoading progress={progress} subHeader={syncMessage} />
        ) :
         (
          <NavigationContainer linking={linking}>
            {/* <Text> */}
            {/* {data ? JSON.stringify(data): "app not opened from deeplink"} */}
            {/* </Text> */}
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        )
      }

>>>>>>> master
    </AuthContext.Provider>
  );
};

export default App;
