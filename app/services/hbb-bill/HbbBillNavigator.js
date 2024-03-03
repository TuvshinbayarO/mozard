import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import HbbBillScreen from "./HbbBillScreen";

const Stack = createStackNavigator();
const HbbBillNavigator = () => (
  <Stack.Navigator
    initialRouteName="HbbBill"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="HbbBill"
      component={HbbBillScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default HbbBillNavigator;
