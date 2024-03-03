import React from "react";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import BonusScreen from "./BonusScreen";
import { BonusItem } from "./BonusItems";
import { BonusDetail } from "./BonusDetail";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const BonusNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BonusScreen"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen name="Урамшуулал" component={BonusScreen} />
      <Stack.Screen name="BonusItem" component={BonusItem} />
      <Stack.Screen name="BonusDetail" component={BonusDetail} options={({route}) => ({title: "Дэлгэрэнгүй"})} />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default BonusNavigator;
