import React, {useState} from "react";
import AppTextError from "../../components/AppTextError";
import { createStackNavigator } from "@react-navigation/stack";
import AppToolbar from "../../components/AppToolbar";
import HomeScreen from "./HomeScreen";
import ProductScreen from "../../services/product/ProductScreen";
import TagScreen from "../../services/tag/TagScreen";
import ProductOptionScreen from "../../services/productOption/ProductOptionScreen";
import GsmBillNavigator from "../../services/gsm-bill/GsmBillNavigator";
import GsmUnitNavigator from "../../services/gsm-unit/GsmUnitNavigator";
import GsmCardNavigator from "../../services/gsm-card/GsmCardNavigator";
import GsmDataNavigator from "../../services/gsm-data/GsmDataNavigator";
import HbbBillNavigator from "../../services/hbb-bill/HbbBillNavigator";
import EmptyNavigator from "../../services/empty/EmptyNavigator";
import DealerChargeNavigator from "../../services/dealer-charge/DealerChargeNavigator";
import CustomerRegisterNavigator from "../../services/customer-register/CustomerRegisterNavigator";
import InventoryNavigator from "../../services/inventory/InventoryNavigator";
import Mnp75CardNavigator from "../../services/mnp75/Mnp75CardNavigator";
import LeasingNavigator from "../../services/leasing/LeasingNavigator";
import GsmSimNavigator from "../../services/gsm-sim/GsmSimNavigator";
import GsmNumberNavigator from "../../services/gsm-number/GsmNumberNavigator";
import GsmPostnumberNavigator from "../../services/gsm-postnumber/GsmPostnumberNavigator";
import MonpayNavigator from "../../services/monpay/MonpayNavigator";
import { PrintPriview } from "../transactions/component/PrintPriview";
import SaleContext from "../../services/saleContext";
import RestorePincode from "../settings/RestorePincode";
// import AgentInfoContext from "../../auth/agentInfo";
const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);

const Stack = createStackNavigator();
const HomeNavigator = () => {
  const [sale, setSale] = useState({});
  // const [gsign, setGsign] = useState({});
  return (
    <SaleContext.Provider value={{ sale, setSale }}>
    {/* <AgentInfoContext.Provider value={{gsign, setGsign}}> */}
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerRight: () => <AppToolbar />
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>

      <Stack.Screen
        name="Tag"
        component={TagScreen}
        options={{
          title: "Үйлчилгээ",
          headerBackTitle: "Буцах"
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={
          ({ route }) => ({ headerShown: true, headerBackTitle: "Буцах", title: "Үйлчилгээ" })
        }
      />
      <Stack.Screen
        name="ProductOption"
        component={ProductOptionScreen}
        options={
          ({ route }) => ({ headerShown: true, title: route.params.title })
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
        options={
          ({ route }) => ({ headerShown: true, id: route.params.id, title: 'Е Баримт' })
        }
      />

      <Stack.Screen
        name="RestorePincode"
        component={RestorePincode}
        options={({ route }) => ({ headerShown: true, title: route.params.title })}
      />

      <Stack.Screen name="NoRoute" component={NoRoute} />

    </Stack.Navigator>
    {/* </AgentInfoContext.Provider> */}
    </SaleContext.Provider>
  );
};

export default HomeNavigator;
