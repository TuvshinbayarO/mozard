import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions, Image, Text } from "react-native";
import AppText from "./AppText";
import Constants from "../resources/Constants";
import Theme from "../resources/Theme";
import { homeIcons } from "../assets/Images";
import Styles from "../resources/Styles";
import { color } from "react-native-reanimated";
const { width, height } = Dimensions.get("window")

function AppAlert({
  title,
  isVisible,
  dismissText,
  onDismiss,
  children,
}) {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
     style={[{width:width, color:"green"}]}
    >
      <View 
     style={[{width:width, height:height, backgroundColor: 'rgba(36, 23, 61, 0.6)'}]}>
        <View style={[{backgroundColor: "white", width: width-40, marginLeft: 20, marginTop:300, borderRadius:24}]}>
        <Image resizeMode={'contain'} style={[Styles.icon64, {marginTop:48, marginLeft:38}]} source={homeIcons["yellowWarning"]} />
        <AppText style={[{ color: "#6581AF", lineHeight:34.13, marginLeft:38,marginTop:20, letterSpacing:-1}, width > 700 ? Styles.text40 : Styles.text28, Styles.fontWeight400]}>
                Анхаар
              </AppText>
          {title && (
            <View>
              <AppText style={[{ color: Constants.COLOR_CODE.gray, marginTop:10 }, width > 700 ? Styles.text26 : Styles.text14 ]}>
                {title}
              </AppText>
            </View>
          )}
          <View>
              {children}
          </View>
          <TouchableOpacity
            style={[{backgroundColor: "#FFBC00", borderRadius:12, marginBottom:10, marginRight:38, marginLeft:38,marginBottom:38, height:60}]}
            onPress={onDismiss}
          >
            <Text style={[{marginTop:17, alignSelf:'center', color:"white"},Styles.letterSpace05, width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight600]}>{dismissText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create(Theme.alertStyle);

export default AppAlert;
