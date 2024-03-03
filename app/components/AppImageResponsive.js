import React from "react";
import { Image } from "react-native";

function AppImageResponsive({ scale, ...otherProps }) {
  return (
    <Image
      style={{
        width: scale,
        height: undefined,
        aspectRatio: 1 / 1,
      }}
      {...otherProps}
    />
  );
}

export default AppImageResponsive;
