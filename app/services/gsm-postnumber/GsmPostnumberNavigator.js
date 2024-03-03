import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmPostnumberScreen from "./GsmPostnumberScreen";
import UserInfoScreen from "./UserInfoScreen";
import AppSignature from "../../screens/signature/AppSignature";
import AppContract from "../../screens/contract/contract"
import UserInfoContext from "../../auth/userInfo";
import GsmPostInfo from "./GsmPostInfo";

const Stack = createStackNavigator();
const alert = () => {
  console.log("Alert function called")
}

const GsmPostnumberNavigator = () => {
  const [userInfo, setUserInfo] = useState({});

  return (
  <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
    <Stack.Navigator
      initialRouteName="GsmPostnumber"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen
        name="GsmPostnumber"
        component={GsmPostnumberScreen}
        options={({ route}) => ({ title: route.params.title, params: route.params })}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={({ route}) => ({ title: route.params.title, params: route.params })}
      />
      <Stack.Screen
        name="GsmPostInfo"
        component={GsmPostInfo}
        options={({ route }) => ({ title: "Дугаар авах", params: route.params })}
      />
      <Stack.Screen
        name="AppSignature"
        component={AppSignature}
        options={({ route }) => ({ title: "Гарын үсэг", params: route})}
      />
      <Stack.Screen
        name="AppContract"
        component={AppContract}
        options={({route}) => ({title: "Гэрээ байгуулах", params: route})}
      />
    </Stack.Navigator>
  </UserInfoContext.Provider>
)};

export default GsmPostnumberNavigator;
