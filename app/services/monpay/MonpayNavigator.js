import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import MonpayCashinScreen from "./MonpayCashinScreen";
import MonpayCashoutScreen from "./MonpayCashoutScreen";

const Stack = createStackNavigator();
const MonpayNavigator = () => (
  <Stack.Navigator
    initialRouteName="Monpay"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="CandyCashin"
      component={MonpayCashinScreen}
      options={({ route }) => ({ title: "MonPay орлого", params: route.params })}
    />
    <Stack.Screen
      name="CandyCashout"
      component={MonpayCashoutScreen}
      options={({ route }) => ({ title: "MonPay зарлага", params: route.params })}
    />
  </Stack.Navigator>
);

export default MonpayNavigator;
