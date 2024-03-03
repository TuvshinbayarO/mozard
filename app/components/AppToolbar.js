import React from "react";
import { View, TouchableOpacity, Image, Dimensions, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "../resources/Styles";
import { appToolbarIcons } from "../assets/Images";

const { width } = Dimensions.get("window");

function AppToolbar(props) {
  const navigation = useNavigation();
  return (
    <View style={Styles.row}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon42 : Styles.icon28, Styles.mLR6]}
            source={appToolbarIcons.notificationActive}
          />
        
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          // Styles.borderRadius16,
          Styles.center,
          Styles.mLR6,
        ]}
        onPress={() => navigation.navigate("Bonus")}
      >
        <Image
          resizeMode={"contain"}
          style={[width > 700 ? Styles.icon42 : Styles.icon28]}
          source={appToolbarIcons.redBell}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        
          <Image
            resizeMode={"contain"}
            style={[width > 700 ? Styles.icon42 : Styles.icon28, Styles.mLR6]}
            source={appToolbarIcons.nav}
          />
        
      </TouchableOpacity>
    </View>
  );
}

export default AppToolbar;
