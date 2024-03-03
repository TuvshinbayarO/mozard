import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import GsmCardScreen from "./GsmCardScreen";

const Stack = createStackNavigator();
const GsmCardNavigator = () => (
  <Stack.Navigator
    initialRouteName="GsmCard"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="GsmCard"
      component={GsmCardScreen}
      options={({ route }) => ({ title: "Цэнэглэгч карт", params: route.params })}
    />
  </Stack.Navigator>
);

export default GsmCardNavigator;
