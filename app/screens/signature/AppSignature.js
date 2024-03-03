import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button, Dimensions, Text, Image } from "react-native";
import ExpoDraw from 'expo-draw'
import { captureRef } from 'react-native-view-shot';
import AppButton from "../../components/AppButton";
import AppModal from "../../components/AppModal";
import Styles from "../../resources/Styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import useUserInfo from "../../hooks/useUserInfo";


const { width, height } = Dimensions.get("window");


function AppSignature() {
  const viewToSnapshotRef = useRef();
  const [snapshotImg, setSnapshotImg] = useState();
  const [modal, setModal] = useState(false);
  const [clear, setClear] = useState()
  const { userData, setUserData, delUserData, resetUserData } = useUserInfo();
  const navigation = useNavigation();
    const navBack = () => {
        setUserData("contract")(true)
        navigation.dispatch(StackActions.pop(2))
    }

  const snapshot = async () => {
    const result = await captureRef(viewToSnapshotRef, { result: 'tmpfile', format: 'png' });
    const signatureBase = await captureRef(viewToSnapshotRef, { result: 'base64' });
    setSnapshotImg(result);
    setUserData("signature")(signatureBase)
    setModal(true)
  };


  return(
    <>
      <View ref={viewToSnapshotRef} collapsable={false} style={{flex: 1}}>
        <ExpoDraw
          strokes={[]}
          containerStyle={{backgroundColor: 'rgba(0,0,0,0)', height: height, width: width}}
          clear={(clearFn) => {
            setClear(() => clearFn);
          }}
          color={'#000'}
          strokeWidth={3}
          enabled={true}
        />
      </View>
      <AppModal isVisible={modal} onDismiss={() => setModal(false)} title="Гарын үсэг">
        {snapshotImg && <Image resizeMode="contain" style={styles.snapshotImg} source={{uri: snapshotImg}} />}
        <AppButton onPress={navBack} title={"Дуусгах"} style={Styles.bgRed}/>
      </AppModal>
      <AppButton onPress={snapshot} title={"Хадгалах"} style={Styles.bgRed}/>
      <AppButton onPress={() => clear()} title={"Цэвэрлэх"} style={Styles.bgBlue}/>
  </>
  
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snapshot: {
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: "#00ffff",
    margin: 16,
    padding: 16
  },
  snapshotImg: {
    width: '100%',
    height: 500,
    // margin: 10
  }
});

export default AppSignature;
