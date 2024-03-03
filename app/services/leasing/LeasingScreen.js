import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppLoader from "../../components/AppLoader";
import useApi from "../../hooks/useApi";
import leasing from "../../api/leasing";
import upload from "../../api/upload";
import sell from "../../api/sell";
import Styles from "../../resources/Styles";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import AppButton1 from "../../components/AppButton1";
import AppContent from "../../components/AppContent";
import AppText from "../../components/AppText";
import * as ImagePicker from 'expo-image-picker';
import mezPreview from '../../api/mez'

const { width } = Dimensions.get("window");

function LeasingScreen({ parentState, onChangeState, route: {params} }) {
  const [info, setInfo] = useState();
  const [status, setStatus] = useState(1);
  const [phone, setPhone] = useState();
  const [register, setRegister] = useState();
  const { request: leasingCheck, loading } = useApi(leasing.checkLeasing);
  const { request: uploadData, data: uploadResult, loading: uploadLoading } = useApi(upload.uploadFile);
  const { request: getPreview, loading: prewLoading } = useApi(sell.preview);
  const navigation = useNavigation();
  const amount = params.prodOpt?.price || params.option?.price;
  const prodOptId = params.prodOpt?.prodOptId || params.option?.prodOptId;
  
  const [isPreviewMez, setIsPreviewMez] = useState()
  const [lname, setLname] = useState();
  const [fname, setFname] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();

  const handleContractPress = () =>{
    navToContract() 
  }

  const navToContract = (route) => {
    navigation.navigate("LeasingMez", { params: route });
  }
  
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handlePress = () => {
    if (phone === undefined || phone === "")
      return Alert.alert("Утасны дугаар оруулна уу !");
    if (register === undefined || register === "")
      return Alert.alert("Регистрийн дугаар оруулна уу !");
    
    leasingCheck(phone, register).then((response) => {
      if (response.code === 0) {
        console.log('response', response)
        setInfo({desc: response.info});
        setStatus(2);
      } else {
        setInfo({desc: response.info || "Зээлийн мэдээлэл шалгахад алдаа гарлаа."});
      }
    }).catch(error => {
      setInfo({desc: "Мэдээлэл олдсонгүй."})
      console.log('error', error);
    });
    
    mezPreview.mezPreview(register, lname, fname).then((res)=>{
      console.log(res)
      setIsPreviewMez(res.data.contractpath)
    })
    
  };

  const handleCancel = () => {
    navigation.navigate("Home", {screen: "Product"});
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1.5],
        quality: 0.5
      });
      setImage1(data);
    } else {
      Alert.alert('Permission denied');
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1.5],
        quality: 0.5
      });
      setImage1(data);
    } else {
      Alert.alert('Permission denied');
    }
  }

  const pickFromGallery2 = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1.5],
        quality: 0.5
      });
      setImage2(data);
    } else {
      Alert.alert('Permission denied');
    }
  }

  const pickFromCamera2 = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1.5],
        quality: 0.5
      });
      setImage2(data);
    } else {
      Alert.alert('Permission denied');
    }
  }

  const handlePress4 = async () => {
    if (!lname)
      return Alert.alert("Эцэг/эх - ийн нэрээ оруулна уу !");
    if (!fname)
      return Alert.alert("Хэрэглэгчийн нэрээ оруулна уу !");
    if (!image1)
      return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");
    if (!image2)
      return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");
    
    let files = [];
    const fd = new FormData();
    fd.append("file", 
      {
        uri: Platform.OS === 'ios' ? image1.uri.replace('file:/', '') : image1.uri,
        type: 'image/jpeg',
        name: "passport1.jpg"
      }
    );
    await uploadData(fd).then((response) => {
      files.push(response.link);
    });

    const fd2 = new FormData();
    fd2.append("file", 
      {
        uri: Platform.OS === 'ios' ? image2.uri.replace('file:/', '') : image2.uri,
        type: 'image/jpeg',
        name: "passport2.jpg"
      }
    );
    await uploadData(fd2).then((response2) => {
      files.push(response2.link);
    });

    const sendData = {
      prodOptId,
      isdn: phone,
      register,
      fname,
      lname,
      buhel: "",
      passRead: false,
      paymentType: 0,
      skipBO: true,
      files, 
      get_mez: params.params.parameter1,
      contractpath: isPreviewMez,
    }
    getPreview(sendData).then((resp) => {
      if (resp.code === 200) {
        navigation.navigate("Info", {
          ...sendData,
          amount: resp.result.payAmount
        });
      } else {
        setInfo({desc: resp.info});
      }
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <AppContent>
        <AppLoader visible={loading} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={Styles.container}
        >
          <Text
            style={[
              Styles.textDarkBlue,
              width > 700 ? Styles.text28 : Styles.text16,
              Styles.fontWeight400
            ]}
          >
            Зээлийн мэдээллийн сангаас шалгуулах
          </Text>
          <Text></Text>
          {info && info.desc && (
            <AppText
              style={[Styles.textRed]}
            >{info.desc}</AppText>
          )}
          {status === 1 && (
            <>
              <AppTextInput
                icon="search"
                onChangeText={phone => setPhone(phone)}
                label="Утасны дугаар"
                keyboardType="numeric"
                autoFocus
                value={phone}
                maxLength={8}
              />
              <AppTextInput
                icon="search"
                onChangeText={register => setRegister(register)}
                label="Регистрийн дугаар"
                // keyboardType="numeric"
                // autoFocus
                value={register}
              />
              <AppButton 
                title='Гэрээ байгуулах'
                onPress={handleContractPress}
              />
              <AppButton onPress={handlePress} title="Үргэлжлүүлэх" disabled={!phone || phone.length < 8 || !register || register.length < 10} />
            </>
          )}
          {status === 2 && (
            <>
              <AppTextInput
                onChangeText={(e) => setLname(e)}
                label="Эцэг/эх - ийн нэр"
                value={lname}
              />
              <AppTextInput
                onChangeText={(e) => setFname(e)}
                label="Хэрэглэгчийн нэр"
                value={fname}
              />
              <Text></Text>
              <Text
                  style={[
                    Styles.textDarkBlue,
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.fontWeight400
                  ]}
                >
                  Цахим үнэмлэхний нүүр зураг
              </Text>
              {image1 && (
                <ImageBackground source={{uri: image1.uri}} style={{height: 160, width: width - 50}} imageStyle={{borderRadius: 15}}/>
              )}
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <View style={{width: '50%', padding: 0}}>
                  <AppButton1 title="Camera" onPress={() => pickFromCamera()} style={[Styles.bgPurple]} />
                </View>
                <View style={{width: '50%', paddingLeft: 10}}>
                  <AppButton1 title="Gallery" onPress={() => pickFromGallery()} style={[Styles.bgPurple]} />
                </View>
              </View>
              <Text></Text>
              <Text
                  style={[
                    Styles.textDarkBlue,
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.fontWeight400
                  ]}
                >
                  Цахим үнэмлэхний арын зураг
              </Text>
              {image2 && (
                <ImageBackground source={{uri: image2.uri}} style={{height: 160, width: width - 50}} imageStyle={{borderRadius: 15}}/>
              )}
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <View style={{width: '50%', padding: 0}}>
                  <AppButton1 title="Camera" onPress={() => pickFromCamera2()} style={[Styles.bgPurple]} />
                </View>
                <View style={{width: '50%', paddingLeft: 10}}>
                  <AppButton1 title="Gallery" onPress={() => pickFromGallery2()} style={[Styles.bgPurple]} />
                </View>
              </View>
              <AppButton onPress={handlePress4} title="Үргэлжлүүлэх" disabled={!lname || !fname || !image1 || !image2} />
            </>
          )}
          <AppButton onPress={handleCancel} style={Styles.bgGray} title="Цуцлах" />
        </KeyboardAvoidingView>
    </AppContent>
    </ScrollView>
  );
}

export default LeasingScreen;
