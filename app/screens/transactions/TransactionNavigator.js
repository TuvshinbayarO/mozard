import React from "react";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import TransactionScreen from "./TransactionScreen";
import { TransactionsList } from "./component/TransactionsList";
import { PrintPriview } from "./component/PrintPriview";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const TransactionNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Гүйлгээний жагсаалт"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen name="Гүйлгээ" component={TransactionScreen} />
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsList}
        options={({ route }) => ({
          id: route.params.id,
          title: route.params.title
          // , title: "Гүйлгээний түүх"
        })}
      />
      <Stack.Screen
        name="PrintPriview"
        component={PrintPriview}
        options={({ route }) => ({
          id: route.params.id, title: 'Е Баримт'
        })}
      />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
