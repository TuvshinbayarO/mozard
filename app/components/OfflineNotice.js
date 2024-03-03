import React from "react";
import { View, StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from "./AppText";
import Styles from "../resources/Styles";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View
        style={[
          Styles.bgRed,
          Styles.p20,
          Styles.center,
          { marginTop: StatusBar.currentHeight },
        ]}
      >
        <AppText style={Styles.textWhite}>
          Интернет холболтоо шалгана уу.
        </AppText>
      </View>
    );
  return null;
}

export default OfflineNotice;
