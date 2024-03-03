import React from "react";
import { NotificationDetail } from "./component/NotificationDetail";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import NotificationScreen from "./NotificationScreen";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const NotificationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen name="Мэдэгдэл" component={NotificationScreen} />
      <Stack.Screen name="Detail" component={NotificationDetail} options={({route}) => ({title: "Дэлгэрэнгүй"})} />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
