import React from "react";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import MonpayPaymentScreen from "./MonpayPaymentScreen";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const MonpayPaymentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Payment"
      screenOptions={{
        headerShown: false,
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen name="Payment" component={MonpayPaymentScreen} />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default MonpayPaymentNavigator;
