import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmSimScreen from "./GsmSimScreen";
import GsmSimInfo from "./GsmSimInfo";
import GsmSimMez from "./GsmSimMez";
import UserInfoContext from "../../auth/userInfo";

const Stack = createStackNavigator();
const GsmSimNavigator = () => {

  const [userInfo, setUserInfo] = useState({});

  return(
  <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
    <Stack.Navigator
      initialRouteName="GsmSim"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen
        name="GsmSim"
        component={GsmSimScreen}
        options={({ route }) => ({ title: "Сим сэргээлт", params: route.params })}
      />
      <Stack.Screen
        name="SimInfo"
        component={GsmSimInfo}
        options={({ route }) => ({ title: "Сим", params: route.params })}
      />
      <Stack.Screen
        name="SimMez"
        component={GsmSimMez}
        options={({ route }) => ({ title: "Сим", params: route.params })}
      />
    </Stack.Navigator>
  </UserInfoContext.Provider>
  )
};

export default GsmSimNavigator;
