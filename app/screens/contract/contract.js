import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button, Dimensions, Text, Image, ScrollView } from "react-native";
import AppButton from "../../components/AppButton";
import Styles from "../../resources/Styles";
import { useNavigation } from "@react-navigation/core";
import AppCheckbox from "../../components/AppCheckbox";
import AppText from "../../components/AppText";


const { width, height } = Dimensions.get("window");

function AppContract(params) {
    const [contract, setContract] = useState();
    const [approval, setApproval] = useState(false);
    const [titles, setTitles] = useState([])
    const navigation = useNavigation();
    const navToSignature = () => {
        navigation.navigate("AppSignature", params);
    }
  return(
    <>
    <ScrollView style={{padding: 20}}>
      <AppText>{params?.route?.params?.contract?.head?.title}</AppText>
      <Text></Text>
      <AppText>{titles[0]}</AppText>
      <Text>{params?.route?.params?.contract?.body?.text1[0]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text1[1]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text1[2]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text1[3]}</Text>
      <Text></Text>
      <AppText>{titles[1]}</AppText>
      <Text>{params?.route?.params?.contract?.body?.text2[0]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[1]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[2]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[3]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[4]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[5]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text2[6]}</Text>
      <Text></Text>
      <AppText>{titles[2]}</AppText>
      <Text>{params?.route?.params?.contract?.body?.text3[0]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text3[1]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text3[2]}</Text>
      <AppText>{titles[3]}</AppText>
      <Text>{params?.route?.params?.contract?.body?.text4[0]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[1]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[2]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[3]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[4]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[5]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[6]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[7]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[8]}</Text>
      <Text>{params?.route?.params?.contract?.body?.text4[9]}</Text>
      <Text>{params?.route?.params?.contract?.body.text4[10]}</Text>
      <Text>{params.route.params.contract.body.text4[11]}</Text>
      <Text>{params.route.params.contract.body.text4[12]}</Text>
      <Text>{params.route.params.contract.body.text4[13]}</Text>
      <Text>{params.route.params.contract.body.text4[14]}</Text>
      <Text>{params.route.params.contract.body.text4[15]}</Text>
      <Text>{params.route.params.contract.body.text4[16]}</Text>
      <AppText>{titles[4]}</AppText>
      <Text>{params.route.params.contract.body.text5[0]}</Text>
      <Text>{params.route.params.contract.body.text5[1]}</Text>
      <Text>{params.route.params.contract.body.text5[2]}</Text>
      <Text>{params.route.params.contract.body.text5[3]}</Text>
      <Text>{params.route.params.contract.body.text5[4]}</Text>
      <Text>{params.route.params.contract.body.text5[5]}</Text>
      <AppText>{titles[5]}</AppText>
      <Text>{params.route.params.contract.body.text6[0]}</Text>
      <Text>{params.route.params.contract.body.text6[1]}</Text>
      <AppText>{titles[6]}</AppText>
      <Text>{params.route.params.contract.body.text7[0]}</Text>
      <Text>{params.route.params.contract.body.text7[1]}</Text>
      <Text>{params.route.params.contract.body.text7[2]}</Text>
      <Text>{params.route.params.contract.body.text7[3]}</Text>
      <Text>{params.route.params.contract.body.text7[4]}</Text>
      <Text>{params.route.params.contract.body.text7[5]}</Text>
      <AppText>{titles[7]}</AppText>
      <Text>{params.route.params.contract.body.text8[0]}</Text>
      <Text>{params.route.params.contract.body.text8[1]}</Text>
      <Text>{params.route.params.contract.body.text8[2]}</Text>
      <Text>{params.route.params.contract.body.text8[3]}</Text>
      <Text>{params.route.params.contract.body.text8[4]}</Text>
      <Text>{params.route.params.contract.body.text8[5]}</Text>
      <Text>{params.route.params.contract.body.text8[6]}</Text>
      <Text>{params.route.params.contract.body.text8[7]}</Text>
      <Text>{params.route.params.contract.body.text8[8]}</Text>
      <AppText>{titles[8]}</AppText>
      <Text>{params.route.params.contract.body.text9[0]}</Text>
      <Text>{params.route.params.contract.body.text9[1]}</Text>
      <Text>{params.route.params.contract.body.text9[2]}</Text>
      <AppText>{titles[9]}</AppText>
      <Text>{params.route.params.contract.body.text10[0]}</Text>
      <Text>{params.route.params.contract.body.text10[1]}</Text>
      <Text>{params.route.params.contract.body.text10[2]}</Text>
      <Text>{params.route.params.contract.body.text10[3]}</Text>
      <Text>{params.route.params.contract.body.text10[4]}</Text>
      <Text>{params.route.params.contract.body.text10[5]}</Text>
      <Text>{params.route.params.contract.body.text10[6]}</Text>
      <Text>{params.route.params.contract.body.text10[7]}</Text>
      <Text>{params.route.params.contract.body.text10[8]}</Text>
      <Text>{params.route.params.contract.body.text10[9]}</Text>
      <Text>{params.route.params.contract.body.text10[10]}</Text>
      <Text>{params.route.params.contract.body.text10[11]}</Text>
      <Text>{params.route.params.contract.body.text10[12]}</Text>
      <Text>{params.route.params.contract.body.text10[13]}</Text>
      <Text>{params.route.params.contract.body.text10[14]}</Text>
      <Text>{params.route.params.contract.body.text10[15]}</Text>
      <Text>{params.route.params.contract.body.text10[16]}</Text>
      <AppText>{titles[10]}</AppText>
      <Text>{params.route.params.contract.body.text11[0]}</Text>
      <Text>{params.route.params.contract.body.text11[1]}</Text>
      <Text>{params.route.params.contract.body.text11[2]}</Text>
      <Text>{params.route.params.contract.body.text11[3]}</Text>
      <Text>{params.route.params.contract.body.text11[4]}</Text>
      <Text>{params.route.params.contract.body.text11[5]}</Text>
      <Text>{params.route.params.contract.body.text11[6]}</Text>
      <Text>{params.route.params.contract.body.text11[7]}</Text>
      <AppText>{titles[11]}</AppText>
      <Text>{params.route.params.contract.body.text12[0]}</Text>
      <Text>{params.route.params.contract.body.text12[1]}</Text>
      <AppText>{titles[12]}</AppText>
      <Text>{params.route.params.contract.body.text13[0]}</Text>
      <Text>{params.route.params.contract.body.text13[1]}</Text>
    </ScrollView>
    <Text></Text>
    <Text></Text>
    <AppCheckbox
        label="Гэрээг хүлээн зөвшөөрөх"
        onPress={() => {setApproval(!approval)}}
        isChecked={approval}
        style={{zIndex: 5}}
    />
    <Text></Text>
    <AppButton
        onPress={navToSignature}
        // style={Styles.m20}
        title="Үргэлжлүүлэх"
        disabled={!approval}
    />
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
  
});

export default AppContract;
