import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import Mnp75CardScreen from "./Mnp75CardScreen";

const Stack = createStackNavigator();
const Mnp75CardNavigator = () => (
  <Stack.Navigator
    initialRouteName="Mnp75Card"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="Mnp75Card"
      component={Mnp75CardScreen}
      options={({ route }) => ({ title: "MNP75 карт" })}
    />
  </Stack.Navigator>
);

export default Mnp75CardNavigator;
