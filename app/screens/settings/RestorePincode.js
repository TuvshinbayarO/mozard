import React, { useEffect, useState } from "react";
import { View, Text, Alert, Dimensions, Image } from "react-native";
import pincodeApi from "../../api/pincode";
import otpApi from "../../api/otp";
import AppTextInput from "../../components/AppTextInput";
import Styles from "../../resources/Styles";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import { min } from "moment";
import { useNavigation } from "@react-navigation/native";
import AppModal from "../../components/AppModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalIcons } from "../../assets/Images";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { FontAwesome5 } from "@expo/vector-icons";
import accountInfoHome from "../../api/accountInfoHome"
import useApi from "../../hooks/useApi";
import storage from "../../auth/storage";
import accountInfo from "../../api/accountInfo";
const { width } = Dimensions.get("window");

function RestorePincode({title}) {
  const navigation = useNavigation();
  const [inputOtp, setInputOtp] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [pinCodeModal, setPinCodeModal] = useState(false); // false bolgono
  const [confirmPincode, setConfirmPincode] = useState("");
  const [accountIsdn, setAccountIsdn] = useState();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e);
    if(e.length == 6) {
      setInputValue('')
      handleContinue(e);
    }
  };
  
  const handleInput = event => {
    setInputValue('');
  }  
  

  const { request: loadAccountInfo, data: info } = useApi(
    accountInfoHome.getAccountInfo
  );

  // const onChangeInputOtp = (e) => {
    
  // };
  const onchangeNewPincode = (e) => {
    setNewPincode(e);
  };
  const onchangeConfirmPincode = (e) => {
    setConfirmPincode(e);
  };
  const getAccountInfoHome = async () => {
    await loadAccountInfo();
  };
  const getAccountIsdn = async () => {
    accountInfo.getIsdn({username: await storage.get("username")}).then((res)=>{
      setAccountIsdn(res.data.info)
    })
  }

  const handleCancel = () => {
    navigation.navigate("Home", {screen: "passwordChange"});
  };

  useEffect(() => {
    getAccountIsdn();
    getAccountInfoHome();
  }, []);

  const navToMain = () => {
    navigation.navigate("homeScreen");
  }



  const handleSubmit = async (e) => {
    if (newPincode !== confirmPincode) {
      Alert.alert("", "Шинэ гүйлгээний нууц үг хоорондоо таарахгүй байна.");
    } else if(newPincode.length < 4) {
      Alert.alert("Гүйлгээний нууц үг 4 оронтой байх ёстой!")
    } else {
      const param = {
        passNew: newPincode,
        username: await storage.get("username")
      };
      
      if(newPincode){
        pincodeApi.restorePincode(param).then((res) => {
          console.log("res.data.info:::::::::", res.data)
            Alert.alert(res.data.info);
            if(res.data.code == 200) {
              navToMain();
            }
        });
    } else {
        Alert.alert("Шинэ нууц үг оруулна уу!")
    }
    }
  };

  const sendOtp = (e) => {
    otpApi.sendOtp({isdn: accountIsdn}).then((res) => {
        Alert.alert(res.data.responseDescription)
    })
  }
  const handleContinue = (e) => {
    otpApi.checkOtp({isdn: accountIsdn, otp: e}).then((res) => {
      console.log("TANKOD RES:", res);
      // setInputOtp("haha")
      if(res.data.responseCode == "SUCCESS") {
        setPinCodeModal(true)
      } else {
        Alert.alert(res.data.responseDescription)
      }
    })
  }

  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[Styles.cell, isFocused && Styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <AppContent>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", alignContent: 'center'}}>
        <View style={{
            width: "59%",
        }}>
        <AppTextInput
            secureTextEntry={true}
            name="otp"
            // onChangeText={onChangeInputOtp}
            placeholder="Баталгаажуулах код"
            keyboardType="numeric"
            maxLength={6}
            onChangeText={handleChange}
            onKeyUp={handleInput}
            value={inputValue}
        />
        
        </View>
        <AppButton style={{ width: "40%", marginLeft: 5, marginTop: 0, backgroundColor: "red"}} onPress={sendOtp} title="Код авах"></AppButton>
            
      </View>
      <AppButton onPress={handleContinue} title="Үргэлжлүүлэх"></AppButton>
      <AppButton
          onPress={handleCancel}
          style={Styles.bgGray}
          title="Цуцлах"
      />
            <AppModal
                type="pincode"
                // title="Гүйлгээний нууц үг"
                isVisible={pinCodeModal}
                successText="Үүсгэх"
                onDismiss={() => {
                  setPinCodeModal(false);
                }}
                onSuccess={() => {
                  setPinCodeModal(false);
                  handleSubmit()
                }}
              >
                <SafeAreaView>
                    <Text style={Styles.title}>Гүйлгээний нууц үг үүсгэх </Text>
                     <Image style={[width > 700 ? Styles.icon64 : Styles.icon54, Styles.icon]} source={modalIcons.pincode} />
                    <Text style={Styles.subTitle}>
                      Шинэ нууц үг оруулна уу
                    </Text>
                    <AppTextInput
                        secureTextEntry={true}
                        name="newPincode"
                        onChangeText={onchangeNewPincode}
                        placeholder="Шинэ гүйлгээний нууц үг"
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    <AppTextInput
                        secureTextEntry={true}
                        name="confirmPincode"
                        onChangeText={onchangeConfirmPincode}
                        placeholder="Шинэ гүйлгээний нууц үг давтах"
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    
                </SafeAreaView>
            </AppModal>
    </AppContent>
  );
}
export default RestorePincode;
