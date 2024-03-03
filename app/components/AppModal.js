import React from "react";
import { View, Modal, TouchableOpacity, Image, Dimensions, Text, KeyboardAvoidingView } from "react-native";
import Constants from "../resources/Constants";
import Styles from "../resources/Styles";
import { modalIcons } from "../assets/Images";
import AppButton from "./AppButton";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const styleSelector = (type) => {
  switch (type) {
    case "warning":
      return Styles.bgYellow;
    case "danger":
      return Styles.bgRed;
    case "success":
      return Styles.bgGreen;
    default:
      return Styles.bgGreen;
  }
};

const { width, height } = Dimensions.get("window");

function AppModal({
  type,
  title,
  isVisible,
  children,
  successText,
  onDismiss,
  onSuccess,
  ...otherProps
}) {
  return (
    <Modal
      {...otherProps}
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View 
        onPress={onDismiss}
        style={[
          Styles.container,
          Styles.centerJustify,
          { backgroundColor: Constants.COLOR_CODE.darkBlue60, zIndex: 0 },
        ]}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[
            Styles.mLR20,
            Styles.borderRadius24,
            Styles.p38,
            Styles.bgWhite, {
              zIndex: 5,
            }
          ]}
        >
          <TouchableOpacity
            onPress={onDismiss}
            activeOpacity={Styles.opacity60.opacity}
            style={[
              Styles.row,
              Styles.p10,
              {
                position: "absolute",
                top: 20,
                right: 20,
              },
            ]}
          >
            <Image style={[width > 700 ? Styles.icon20 : Styles.icon14]} source={modalIcons.close} />
          </TouchableOpacity>
          {type === "warning" && (
            <Image style={width > 700 ? Styles.icon64 : Styles.icon48} source={modalIcons.warning} />
          )}
          {type === "danger" && (
            <Image style={width > 700 ? Styles.icon64 : Styles.icon48} source={modalIcons.danger} />
          )}
          {type === "success" && (
            <Image style={width > 700 ? Styles.icon64 : Styles.icon48} source={modalIcons.success} />
          )}
          {/* {type === "pincode" && (
            <Image style={width > 700 ? Styles.icon64 : Styles.icon48} source={modalIcons.pincode} />
          )} */}
          {title && (
            <Text
              style={[
                Styles.textBlue2,
                width > 700 ? Styles.text36 : Styles.text24,
                Styles.mTB12,
                Styles.fontWeight300,
              ]}
            >
              {title}
            </Text>
          )}
          <View>{children}</View>

          {onSuccess && (
            <AppButton
              style={[styleSelector(type), {marginBottom: 30}]}
              title={successText}
              onPress={onSuccess}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default AppModal;
