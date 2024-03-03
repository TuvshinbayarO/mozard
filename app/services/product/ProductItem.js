import React, { useEffect } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text, Platform, ImageBackground } from "react-native";
import AppText from "../../components/AppText";
import Styles from "../../resources/Styles";
import { homeIcons } from "../../assets/Images";
import { tagIcons } from "../../assets/Images";

const { width, height } = Dimensions.get('window')

function MenuItem({ name, type, onPress, icon, prodOptId }) {
  return (
    <>
      {type ? (
        <>
          {[17, 80, 20, 24, 74].includes(type) ? (
            Platform.OS === 'android' ? (
              <TouchableOpacity
                activeOpacity={Styles.opacity60.opacity}
                onPress={onPress}
              >
                <View
                  style={[
                    Styles.borderRadius12,
                  ]}
                >
                  <Image resizeMode="cover" style={[, { height: width > 700 ? 280 : 160, width: (width -50) / 2, marginLeft: 10, marginBottom: 10, borderRadius: 6 }]} source={icon} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={Styles.opacity60.opacity}
                style={{
                  alignItems: 'left',
                }}
                onPress={onPress}
              >
                <View
                  style={[
                    Styles.borderRadius12,
                    Styles.blueShadow,
                  ]}
                >
                  <Image style={[{ height: width > 700 ? 520 : 170, width: (width - 74) / 2, marginLeft: 10, marginBottom: 10, borderRadius: 6 }]} source={icon} />
                </View>
              </TouchableOpacity>
            )
          ) : type === 86 ? (
            prodOptId && prodOptId === 658 ? (
            <View>
              <Image resizeMode={'contain'} style={[width > 700 ? Styles.icon84 : Styles.icon64, {marginLeft:38}]} source={homeIcons["yellowWarning"]} />
              <AppText style={[{ 
                color: "#6581AF", 
                lineHeight: 34.13, 
                marginLeft: 15,
                marginRight: 15,
                marginTop: 10, 
                letterSpacing:-1}
                , width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight400]}>
                Уучлаарай, Аппликейшнээр үзүүлэх боломжгүй үйлчилгээ.
              </AppText>
            </View>
            ) : (<></>)
          ) : type === 89 ? (
            <></>
          ) : (
            <TouchableOpacity
              activeOpacity={Styles.opacity60.opacity}
              onPress={onPress}
              style={{width: '100%'}}
            >
              <View
                style={
                  [ 
                    // Styles.container,
                    // Styles.column,
                    Styles.alignPrimaryStart,
                    Styles.bgWhite,
                    Styles.borderRadius8,
                    Styles.mTB6,
                    Styles.blueShadow,
                  ]
                }
              >
                <View style={{width: '100%', padding: 15, flexDirection: "row"}}>
                  <View style={{width: '20%'}}>
                    <Image style={width > 700 ? Styles.icon84 : Styles.icon64} source={tagIcons["tag" + type]} />
                  </View>
                  <View style={{width: '80%'}}>
                    <AppText style={[width > 700 ? Styles.text24 : Styles.text16]}>
                      {name}
                    </AppText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity
          activeOpacity={Styles.opacity60.opacity}
          onPress={onPress}
        >
          <View
            style={[
              Styles.container,
              Styles.row,
              Styles.alignPrimaryStart,
              Styles.bgWhite,
              Styles.borderRadius12,
              Styles.mTB6,
              Styles.blueShadow,
            ]}
          >
            <Image style={width > 700 ? Styles.icon84 : Styles.icon64} source={icon} 
            />
            <AppText
              numberOfLines={2}
              style={[Styles.container, Styles.alignSelfCenter, width > 700 ? Styles.text24 : Styles.text16]}
            >
              {name}
            </AppText>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

export default MenuItem;