import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmUnitScreen from "./GsmUnitScreen";

const Stack = createStackNavigator();
const GsmUnitNavigator = () => (
  <Stack.Navigator
    initialRouteName="GsmUnit"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="GsmUnit"
      component={GsmUnitScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default GsmUnitNavigator;
