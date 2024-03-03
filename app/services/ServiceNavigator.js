import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TagScreen from "./tag/TagScreen";
import GsmBillNavigator from "./gsm-bill/GsmBillNavigator";
import ProductScreen from "./product/ProductScreen";
import AppToolbar from "../components/AppToolbar";
import ProductOptionScreen from "./productOption/ProductOptionScreen";
import AppTextError from "../components/AppTextError";
import HbbBillNavigator from "./hbb-bill/HbbBillNavigator";
import SaleContext from "./saleContext";
import GsmUnitNavigator from "./gsm-unit/GsmUnitNavigator";
import GsmCardNavigator from "./gsm-card/GsmCardNavigator";
import InventoryNavigator from "./inventory/InventoryNavigator";
import GsmDataNavigator from "./gsm-data/GsmDataNavigator";
import DealerChargeNavigator from "./dealer-charge/DealerChargeNavigator";
import CustomerRegisterNavigator from "./customer-register/CustomerRegisterNavigator";
import Mnp75CardNavigator from "./mnp75/Mnp75CardNavigator";
import GsmSimNavigator from "./gsm-sim/GsmSimNavigator";
import GsmPostnumberNavigator from "./gsm-postnumber/GsmPostnumberNavigator";
import GsmNumberNavigator from "./gsm-number/GsmNumberNavigator";
import MonpayNavigator from "./monpay/MonpayNavigator";
import LeasingNavigator from "./leasing/LeasingNavigator";
import EmptyNavigator from "./empty/EmptyNavigator";
import { PrintPriview } from "../screens/transactions/component/PrintPriview";
import { useNavigation } from "@react-navigation/native";
import AppContractNavigator from "../screens/contract/ContractNavigator";
import SignatureNavigator from "../screens/signature/SignatureNavigator";

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const ServiceNavigator = () => {
  const navigation = useNavigation();
  const [sale, setSale] = useState({});

  return (
    <SaleContext.Provider value={{ sale, setSale }}>
      <Stack.Navigator
      initialRouteName="Product"
        screenOptions={{
          headerRight: () => <AppToolbar />,
          headerBackTitle: "Буцах"
        }}
      >
        <Stack.Screen
          name="Tag"
          component={TagScreen}
          options={{
            title: "Үйлчилгээ",
            headerBackTitle: "back666"
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={
            [({ route }) => ({ title: route.params.title }),
            {headerBackTitle: "hello back"}]
          }
        />
        <Stack.Screen
          name="ProductOption"
          component={ProductOptionScreen}
          options={
            ({ route }) => ({ title: route.params.title })
          }
        />
        <Stack.Screen
          name="GsmBill"
          component={GsmBillNavigator}
          options={({ route }) => ({headerShown: false , params: route.params })}
        />
        <Stack.Screen
          name="GsmUnit"
          component={GsmUnitNavigator}
          // options={{ headerShown: false }}
          options={({ route }) => ({headerShown: false , title: route.params.title })}
        />
        <Stack.Screen
          name="GsmCard"
          component={GsmCardNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GsmData"
          component={GsmDataNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HbbBill"
          component={HbbBillNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HbbCharge"
          // component={HbbChargeNavigator}
          component={EmptyNavigator}
          options={({ route }) => ({headerShown: false , title: route.params.title })}
        />
        <Stack.Screen
          name="DealerCharge"
          component={DealerChargeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerRegister"
          component={CustomerRegisterNavigator}
          options={({ route }) => ({headerShown: false , title: route.params.title, params: route.params })}
        />
        <Stack.Screen
          name="Inventory"
          component={InventoryNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mnp75Card"
          component={Mnp75CardNavigator}
          options={({ route }) => ({headerShown: false , title: route.params.title, params: route.params })}
        />
        <Stack.Screen
          name="LeasingCheck"
          component={LeasingNavigator}
          options={({ route }) => ({headerShown: false , params: route.params })}
        />
        <Stack.Screen
          name="GsmPackageup"
          component={EmptyNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GsmSim"
          component={GsmSimNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GsmNumber"
          component={GsmNumberNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GsmPostnumber"
          component={GsmPostnumberNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppContractNavigator"
          component={AppContractNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandyCashin"
          component={MonpayNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandyCashout"
          component={MonpayNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PrintPriview"
          component={PrintPriview}
          options={({ route }) => ({
            id: route.params.id, title: 'Е Баримт'
          })}
        />
        <Stack.Screen
          name="SignatureNavigator"
          component={SignatureNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="NoRoute" component={NoRoute} />
      </Stack.Navigator>
    </SaleContext.Provider>
  );
};

export default ServiceNavigator;
