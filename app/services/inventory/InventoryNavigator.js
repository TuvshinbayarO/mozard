import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import InventoryListScreen from "./InventoryListScreen";
import InventoryInfo from "./InventoryInfo";

const Stack = createStackNavigator();
const InventoryNavigator = () => (
  <Stack.Navigator
    initialRouteName="List"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="List"
      component={InventoryListScreen}
      options={({ route }) => ({ title: route.params.title && route.params.title.length > 15 ? route.params.title.substring(0, 15) + "..." : route.params.title })}
    />
    <Stack.Screen
      name="Info"
      component={InventoryInfo}
      options={({ route }) => ({title: route.params.title, params: route.params })}
    />
  </Stack.Navigator>
);

export default InventoryNavigator;
