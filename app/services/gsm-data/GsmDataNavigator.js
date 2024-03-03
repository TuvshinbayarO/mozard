import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmDataScreen from "./GsmDataScreen";

const Stack = createStackNavigator();
const GsmDataNavigator = () => (
  <Stack.Navigator
    initialRouteName="GsmData"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="GsmData"
      component={GsmDataScreen}
      options={({ route }) => ({ title: "Дата багц", params: route.params })}
    />
  </Stack.Navigator>
);

export default GsmDataNavigator;
