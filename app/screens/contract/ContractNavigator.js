import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppSignature from "../signature/AppSignature";
import AppToolbar from "../../components/AppToolbar";

const Stack = createStackNavigator();
const AppContractNavigator = () => (
  <Stack.Navigator
    initialRouteName="Contract"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    <Stack.Screen
      name="AppSignature"
      component={AppSignature}
      options={({ route }) => ({ title: "Гарын үсэг"})}
    />
   
  </Stack.Navigator>
);

export default AppContractNavigator;
