import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import CustomerRegisterScreen from "./CustomerRegisterScreen";
import Info from "./Info";
import CustomerMez from "./CustomerMezMez";
import AppTextError from "../../components/AppTextError";
import Styles from "../../resources/Styles";

const NoRoute = () => (
  <View style={[Styles.p10]}>
    <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
  </View>
);

const Stack = createStackNavigator();
const CustomerRegisterNavigator = () => (
  <Stack.Navigator
    initialRouteName="CustomerRegister"
    screenOptions={{
      headerRight: () => <AppToolbar />
    }}
  >
    <Stack.Screen
      name="CustomerRegister"
      component={CustomerRegisterScreen}
      options={({ route }) => ({params: route.params, title: "Хэрэглэгчийн бүрт..." })}
    />
    <Stack.Screen
      name="Info"
      component={Info}
      options={({ route }) => ({params: route.params })}
    />
    {/* <Stack.Screen name="Уг үйлчилгээг үзүүлэх..." component={NoRoute} /> */}
     <Stack.Screen
      name="CustomerMez"
      component={CustomerMez}
      options={({ route }) => ({ title: "Хэрэглэгчийн бүрт...", params: route.params })}
    />
  </Stack.Navigator>
);

export default CustomerRegisterNavigator;
