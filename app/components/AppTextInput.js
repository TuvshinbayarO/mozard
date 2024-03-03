import React from "react";
import { TextInput, View, TouchableOpacity, Platform, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AppText from "./AppText";
import Styles from "../resources/Styles";

const { width } = Dimensions.get("window");

function AppTextInput({ label, icon, onPress, ...otherProps }) {
  return (
    <View>
      {label && (
        <AppText style={[Styles.textDarkBlue, width > 700 ? Styles.text20 : Styles.text12,{marginTop:10}]}>{label}</AppText>
      )}
      <View style={[Styles.mTB6, Styles.row]}>
        <TextInput
          {...otherProps}
          style={[
            Styles.container,
            Styles.borderBlue2,
            Platform.OS == "ios" ? Styles.p16 : Styles.p10,
            Styles.textDarkBlue,
            width > 700 ? Styles.text26 : Styles.text14,
            icon
              ? {
                  borderTopLeftRadius: Styles.borderRadius12.borderRadius,
                  borderBottomLeftRadius: Styles.borderRadius12.borderRadius,
                  borderRightWidth: 0,
                }
              : Styles.borderRadius12,
          ]}
        />
        {icon && (
          <View
            style={[
              Styles.center,
              Styles.borderBlue2,
              {
                borderTopRightRadius: Styles.borderRadius12.borderRadius,
                borderBottomRightRadius: Styles.borderRadius12.borderRadius,
                borderLeftWidth: 0,
              },
            ]}
          >
            <TouchableOpacity
              onPress={onPress}
              style={[Styles.container, Styles.center]}
            >
              <FontAwesome5
                size={20}
                name={icon}
                style={[Styles.textRed, Styles.mLR10]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
export default AppTextInput;
