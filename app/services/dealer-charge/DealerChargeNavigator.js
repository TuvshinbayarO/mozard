import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import DealerChargeScreen from "./DealerChargeScreen";
import DealerInfo from "./DealerInfo";

const Stack = createStackNavigator();
const DealerChargeNavigator = () => (
  <Stack.Navigator
    initialRouteName="DealerCharge"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="DealerCharge"
      component={DealerChargeScreen}
      options={({ route }) => ({title: "Гэрээт борлуулагч..." })}
    />
    <Stack.Screen
      name="Info"
      component={DealerInfo}
      options={({ route }) => ({title: "Гэрээт борлуулагч...", params: route.params })}
    />
  </Stack.Navigator>
);

export default DealerChargeNavigator;
