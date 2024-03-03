import {React, useState} from "react";
import { ImageBackground, Alert, Dimensions, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import menu from "../navigation/menu";
import Styles from "../resources/Styles";
import SettingsNavigator from "../screens/settings/SettingsNavigator";
import PromotionNavigator from "../screens/promotion/PromotionNavigator";
import HomeScreen from "../screens/home/HomeScreen";
import useAuth from "../hooks/useAuth";
import { navigationIcons } from "../assets/Images";
import AppToolbar from "../components/AppToolbar";
import HelpScreen from "../screens/help/HelpScreen";
import PanelScreen from "../screens/myPanel/PanelScreen";
import TransactionNavigator from "../screens/transactions/TransactionNavigator";
import UpdateInfoNavigator from "../services/customer-register/CustomerRegisterNavigator";
import NotificationNavigator from "../screens/notification/NotificationNavigator";
import BonusNavigator from "../screens/bonus/BonusNavigator";
import MonpayPaymentNavigator from "../screens/monpayPayment/MonpayPaymentNavigator";
import LoginScreen from "../screens/LoginScreen";
import HomeNavigator from "../screens/home/HomeNavigator";
// import AgentInfoContext from "../auth/agentInfo"
import GsignScreen from "../screens/gsign/GsignScreen";

const { width } = Dimensions.get("window");

const routeFunction = (label) => Alert.alert("Link to " + label);

const CustomDrawer = ({ navigation: { navigate }, user, props }) => {
  const { logout } = useAuth();
  const [users, setUsers] = useState(false)
  const handleLogout = () => {
    logout();
    navigate("Home");
  };

  const handlePress = (item) => {
    setUsers(true)
    item.route
      ? item.route === "Logout"
        ? handleLogout()
        : navigate(item.route)
      : routeFunction(item.label);
  };
  return (
    <ImageBackground
      source={navigationIcons.navBg}
      style={{ width: "100%", height: "100%" }}
    >
      <DrawerContentScrollView {...props} style={Styles.container}>
        <DrawerItem
          // focused={users}
          testID={user.dealerCode}
          label='' // Call the function if it is one
          activeTintColor={Styles.bgWhite.backgroundColor}
          inactiveTintColor={Styles.bgWhite.backgroundColor}
          labelStyle={[
            width > 700 ? Styles.text24 : Styles.text14,
            { alignSelf: "center" },
          ]}
        />
        {menu.map((item) => (
          <DrawerItem
            key={item.label}
            label={item.label}
            onPress={() => handlePress(item)}
            activeTintColor={Styles.bgWhite.backgroundColor}
            inactiveTintColor={Styles.bgWhite.backgroundColor}
            activeBackgroundColor={Styles.bgWhite.backgroundColor}
            labelStyle={[width > 700 ? Styles.text22 : Styles.text14]}
          />
        ))}
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { user } = useAuth();
  // const [gsign, setGsign] = useState({});
  return (
    // <AgentInfoContext.Provider value={{gsign, setGsign}}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} user={user} />}
        drawerStyle={{
          width: "80%",
        }}
        initialRouteName="Home"
        drawerType="back"
        screenOptions={{
          headerShown: true,
          headerRight: () => <AppToolbar />,
        }}
      >
        <Drawer.Screen
          options={{
            headerShown: false,
            headerRight: () => <AppToolbar />,
          }}
          name="Home"
          // component={HomeScreen}
          component={HomeNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
            headerRight: () => <AppToolbar />,
            headerLeft: () => <Button>back to future</Button>,
          }}
          name="ServiceDetail"
          component={HomeScreen}
        />
        <Drawer.Screen
          options={{
            headerLeft: () => null,
            headerShown: true,
            title: "Миний булан",
          }}
          name="Panel"
          component={PanelScreen}
        />
        {/* <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="Service"
          component={ServiceNavigator}
        /> */}
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Transaction"
          component={TransactionNavigator}
        />
        <Drawer.Screen
          options={{
            headerLeft: () => null,
            headerShown: true,
            title: "Татан авалт",
          }}
          name="Payment"
          component={MonpayPaymentNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Help"
          component={HelpScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={SettingsNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: true}}
          name="GSIGN"
          component={GsignScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Promotion"
          component={PromotionNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="UpdateInfo"
          component={UpdateInfoNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Bonus"
          component={BonusNavigator}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={NotificationNavigator}
        />
      </Drawer.Navigator>
    // </AgentInfoContext.Provider>
  );
};

export default AppNavigator;
