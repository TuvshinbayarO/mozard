import React from "react";
import { SafeAreaView, View, StatusBar} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../resources/Styles";
import Constants from "../resources/Constants";
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ScrollView } from "react-native-gesture-handler";

function AppScreen({ children, style }) {
  return (
    <SafeAreaView style={[Styles.container, { paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 40 : 20 : 0 }]}>
      <View
        style={[
          Styles.container,
          style,

          {
            paddingTop: StatusBar.currentHeight,
          },
        ]}
      >
        <LinearGradient
          style={Styles.container}
          colors={[
            Constants.COLOR_CODE.white,
            Constants.COLOR_CODE.blue260,
            Constants.COLOR_CODE.blue260,
          ]}
          start={[0, 0]}
          end={[1, 1]}
        >
          {children}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
export default AppScreen;
