import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmBillScreen from "./GsmBillScreen";

const Stack = createStackNavigator();
const GsmBillNavigator = () => (
  <Stack.Navigator
    initialRouteName="GsmBill"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="GsmBill"
      component={GsmBillScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default GsmBillNavigator;
