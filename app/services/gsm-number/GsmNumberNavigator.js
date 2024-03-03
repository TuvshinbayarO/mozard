import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmNumberScreen from "./GsmNumberScreen";
import GsmNumberInfo from "./GsmNumberInfo";
import AppSignature from "../../screens/signature/AppSignature";
import GsmNumberMez from "./GsmNumberMez";
import UserInfoContext from "../../auth/userInfo";

const Stack = createStackNavigator();
const GsmSimNavigator = () => {
  
  const [userInfo, setUserInfo] = useState({});

  return(

  <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
    <Stack.Navigator
      initialRouteName="GsmNumber"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen
        name="GsmNumber"
        component={GsmNumberScreen}
        options={({ route }) => ({ title: "Шинэ дугаар", params: route.params})}
      />
      <Stack.Screen
        name="NumberInfo"
        component={GsmNumberInfo}
        options={({ route }) => ({ title: "Дугаар", params: route.params })}
      />
      <Stack.Screen
          name="NumberMez"
          component={GsmNumberMez}
          options={({ route }) => ({ title: "Гарын үсэг", params: route})}
        />
    </Stack.Navigator>
  </UserInfoContext.Provider>
  )
}

export default GsmSimNavigator;
