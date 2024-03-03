import React from "react";
import { Text, View, Button } from "react-native";
import { PromotionDetail } from "./component/PromotionDetail";
import PromotionScreen from "./PromotionScreen";
import { useNavigation } from "@react-navigation/native";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const PromotionNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PromotionList"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen name="PromotionScreen" component={PromotionScreen} options={({route}) => ({title: "Урамшуулал"})} />
      <Stack.Screen name="PromotionDetail" component={PromotionDetail} options={({route}) => ({title: "Дэлгэрэнгүй"})} />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default PromotionNavigator;
