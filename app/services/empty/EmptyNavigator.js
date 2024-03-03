import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import EmptyScreen from "./EmptyScreen";

const Stack = createStackNavigator();
const EmptyNavigator = () => (
  <Stack.Navigator
    initialRouteName="Багц"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="Багц"
      component={EmptyScreen}
      options={({ route }) => ({title: "" })}
      // options={({ route }) => ({title: route.params && route.params.title && route.params.title.length > 15 ? route.params.title.substring(0, 15) + "..." : route.params.title })}
    />
  </Stack.Navigator>
);

export default EmptyNavigator;
