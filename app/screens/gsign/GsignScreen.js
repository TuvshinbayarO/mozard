import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions, Button } from "react-native";
import pincodeApi from "../../api/pincode";
import AppTextInput from "../../components/AppTextInput";
import Styles from "../../resources/Styles";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import storage from "../../auth/storage";
import AppText from "../../components/AppText";
import { useNavigation } from "@react-navigation/core";
import dsignApi from "../../api/dsign"


const { width } = Dimensions.get("window");

function GsignScreen(props) {
  const navigation = useNavigation();
  const [confirmIsdn, setConfirmIsdn] = useState();
  const [register, setRegister] = useState();
  const [isEditable, setIsEditable] = useState(true);
  const [withGsign, setWithGsign] = useState()
  const [isConfirm, setConfirm] = useState(false)
  const [seconds, setSeconds] = useState(10);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (countdownStarted && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdownStarted, seconds]);

  const handleSubmit = async () => {
    setCountdownStarted(true);
    setConfirm(!isConfirm)
    dsignApi.dsign({ isdn: confirmIsdn, register: register }).then((res) => {
      console.log('res==========', res)
      if (res.data.code == "0") {
        Alert.alert("Тоон гарын үсэг амжилттай баталгаажлаа");
        setIsEditable(false);
        setWithGsign("true");
        storage.put("register", register);
        storage.put("gSignIsdn", confirmIsdn);
        storage.put("withGsign", "true")
      } else if (res.data.code == "500" || res.data.code == "400") {
        // Alert.alert("Гарын үсэг баталгаажсангүй")
      } else {
        Alert.alert("Gsign aldaa garlaa")
      }
    })
  };

  useEffect(() => {
    getGsign()
  }, [])

  const getGsign = async () => {
    setRegister(await storage.get("register"))
    setConfirmIsdn(await storage.get("gSignIsdn"))
    setWithGsign(await storage.get("withGsign"))
    if (await storage.get("withGsign")) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }

    console.log(await storage.get("register"))
    console.log("withGsign", await storage.get("withGsign"))
  }

  const handleSubmit2 = () => {
    if (isConfirm == true) {
      Alert.alert("Тоон гарын үсэг амжилттай баталгаажлаа");
      setIsEditable(false);
      setWithGsign("true");
      storage.put("register", register);
      storage.put("gSignIsdn", confirmIsdn);
      storage.put("withGsign", "true")
    } else if (isConfirm == false || isConfirm == null) {
      Alert.alert("Гарын үсэг баталгаажсангүй")
    } else {
      Alert.alert("Gsign aldaa garlaa")
    }
  }

  return (
    <AppContent>
      <View>
        {/* <AppText>{gsign?.register ? <Text>gsign baina</Text>: <Text>gsign baihgui</Text>}</AppText> */}
        <AppTextInput
          onChangeText={(data) => setRegister(data)}
          value={register}
          label={"Регистрийн дугаар"}
          editable={isEditable}
        />
        <View >
        </View>
        <AppTextInput
          onChangeText={(data) => setConfirmIsdn(data)}
          keyboardType="number-pad"
          label={"Утасны дугаар"}
          value={confirmIsdn}
          editable={isEditable}
          maxLength={8}
        />
        {
          withGsign != "true" ? <AppButton
            onPress={handleSubmit}
            disabled={!register || !confirmIsdn}
            title="Үргэлжлүүлэх"></AppButton> : <></>
        }

        {withGsign != "true" ? <AppButton
          onPress={handleSubmit2}
          disabled={!countdownStarted || seconds > 0}
          title={`Хадгалах (${seconds})`}></AppButton> : <></>
        }

      </View>
    </AppContent>
  );
}
export default GsignScreen;