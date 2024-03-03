import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppToolbar from "../../components/AppToolbar";
import LeasingScreen from "./LeasingScreen";
import LeasingInfo from "./LeasingInfo";
import LeasingMez from "./LeasingMez";
import Styles from "../../resources/Styles";
import AppTextError from "../../components/AppTextError";

const NoRoute = () => (
  <View style={[Styles.p10]}>
    <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
  </View>
);

const Stack = createStackNavigator();
const LeasingNavigator = () => (
  <Stack.Navigator
    initialRouteName="LeasingCheck"
    screenOptions={{
      headerRight: () => <AppToolbar />,
    }}
  >
    {/* <Stack.Screen name="Уг үйлчилгээг үзүүлэх..." component={NoRoute} /> */}
    <Stack.Screen
      name="LeasingCheck"
      component={LeasingScreen}
      options={({ route }) => ({ params: route.params, title: "ЗМС шалгах" })}
    />
    <Stack.Screen
      name="Info"
      component={LeasingInfo}
      options={({ route }) => ({title: route.params.title, params: route.params })}
    />
    <Stack.Screen
        name="LeasingMez"
        component={LeasingMez}
        options={({ route }) => ({ title: "Гарын үсэг", params: route})}
      />
  </Stack.Navigator>
);

export default LeasingNavigator;
