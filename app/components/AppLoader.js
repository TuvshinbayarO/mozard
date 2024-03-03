import React from "react";
import LottieView from "lottie-react-native";
import Styles from "../resources/Styles";

function AppLoader({ visible = false }) {
  if (!visible) return null;
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loader.json")}
      style={[
        Styles.bgWhite,
        {
          zIndex: 1,
          position: "absolute",
        },
      ]}
    />
  );
}

export default AppLoader;
