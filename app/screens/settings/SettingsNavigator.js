import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppTextError from "../../components/AppTextError";
import AppToolbar from "../../components/AppToolbar";
import ChangePassword from "./ChangePassword";
import ChangePincode from "./ChangePincode";
import RestorePincode from './RestorePincode'
import HomeScreen from '../home/HomeScreen';
import AppContent from "../../components/AppContent";
import { FlatList } from "react-native-gesture-handler";
import ProductItem from "../../services/product/ProductItem";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from "react-native-confirmation-code-field";
const list = [
  { engName: "passwordChange", name: "Нэвтрэх нууц үг солих" },
  { engName: "pinChange", name: "Гүйлгээний нууц үг солих" },
  { engName: "pinRestore", name: "Гүйлгээний нууц үг сэргээх" },
];

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);
const NewRoute = ({ navigation }) => (
  <AppContent>
    {list && list.length ? (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item) => item.engName.toString()}
        renderItem={({ item }) => (
          <View>
            <ProductItem
              product={item}
              name={item.name}
              onPress={() => navigation.navigate(item.engName)}
              icon={require("../../assets/Pay.png")}
            />
          </View>
        )}
      />
    ) : (
        <AppTextError>Сонголт байхгүй байна.</AppTextError>
      )}
  </AppContent>
);

const Stack = createStackNavigator();
const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="new"
      screenOptions={{
        headerRight: () => <AppToolbar />,
        headerBackTitle: "Буцах"
      }}
    >
      <Stack.Screen
        name="new"
        component={NewRoute}
        options={{ title: "Тохиргоо" }}
      />
      <Stack.Screen
        name="pinRestore"
        component={RestorePincode}
        options={{ title: "Нууц үг сэргээх" }}
      />
      <Stack.Screen
        name="pinChange"
        component={ChangePincode}
        options={{ title: "Нууц үг солих" }}
      />
      <Stack.Screen
        name="passwordChange"
        component={ChangePassword}
        options={{ title: "Нууц үг солих" }}
      /> 
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ title: "Нууц үг солих" }}
      />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
