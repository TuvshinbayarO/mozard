import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import UserInfoScreen from "../../services/gsm-postnumber/UserInfoScreen";
import AppContract from "../contract/contract";

const Stack = createStackNavigator();
const SignatureNavigator = () => (
  <Stack.Navigator
    initialRouteName="AppSignature"
    screenOptions={{
      headerRight: () => <AppToolbar />
    }}
  >
    <Stack.Screen
      name="AppContract"
      component={AppContract}
      options={({ route }) => ({ title: "Дараа төлбөрт дугаар"})}
    />
    <Stack.Screen
      name="UserInfo"
      component={UserInfoScreen}
      options={({root}) => ({root})}
    />
  </Stack.Navigator>
);

export default SignatureNavigator;
