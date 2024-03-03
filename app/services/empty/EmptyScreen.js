import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import Styles from "../../resources/Styles";
import { homeIcons } from "../../assets/Images";
import AppContent from "../../components/AppContent";
import AppText from "../../components/AppText";
import Constants from "../../resources/Constants";

function EmptyScreen() {
  const { width, height } = Dimensions.get("window");
  
  return (
    <AppContent>
      <View>
        <Image resizeMode={'contain'} style={[Styles.icon64, {marginLeft:38}]} source={homeIcons["yellowWarning"]} />
        <AppText style={[{ 
          color: "#6581AF", 
          lineHeight:34.13, 
          marginLeft:15,
          marginRight: 15,
          marginTop:20, 
          letterSpacing:-1}
          , width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight400]}>
          Уучлаарай, Аппликейшнээр үзүүлэх боломжгүй үйлчилгээ.
        </AppText>
      </View>
    </AppContent>
  );
}

export default EmptyScreen;
