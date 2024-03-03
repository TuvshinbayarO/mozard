import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import HbbChargeScreen from "./HbbChargeScreen";
import HbbCustomerInfo from "./HbbCustomerInfo";

const Stack = createStackNavigator();
const HbbChargeNavigator = () => (
  <Stack.Navigator
    initialRouteName="HbbCharge"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen name="HbbCharge" component={HbbChargeScreen} />
    <Stack.Screen name="Info" component={HbbCustomerInfo}/>
  </Stack.Navigator>
);

export default HbbChargeNavigator;
