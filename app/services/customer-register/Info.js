import React, { useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";
import { useState } from "react";
import AppTextInput from "../../components/AppTextInput";
import { Switch } from "react-native-gesture-handler";
import AppTextInfo from "../../components/AppTextInfo";
import WithSale from "../hoc/withSale";
import useApi from "../../hooks/useApi";
import cityApi from "../../api/cities";
import districtApi from "../../api/districts";
import khorooApi from "../../api/khoroos";
import CityPicker from "./CityPicker";
import useSale from "../../hooks/useSale";
import DistrictPicker from "./DistrictPicker";
import KhorooPicker from "./KhorooPicker";
import AppLoader from "../../components/AppLoader";
import AppButton from "../../components/AppButton";
// import { useNavigation } from "@react-navigation/core";

const { width } = Dimensions.get("window");

function Info({ route: { params }, parentState, onChangeState }) {
  const { setParams } = useSale();
  const [dealerId, setDealerId] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [khoroo, setKhoroo] = useState();
  const [info, setInfo] = useState();
  // const navigation = useNavigation();
  // parentState.prodOptId = params.prodOpt;
  
  const { request: loadCity, data: cities } = useApi(cityApi.getCities);
  const getCity = async () => {
    await loadCity();
  };
  const { request: loadDistrict, data: districts } = useApi(districtApi.getDistricts);
  const getDistrict = async (city) => {
    await loadDistrict(city);
  };
  const { request: loadKhoroo, data: khoroos } = useApi(khorooApi.getKhoroos);
  const getKhoroo = async () => {
    await loadKhoroo(1, 1);
  };

  const setDefault = async () => {
    await onChangeState("prodOptId")(params.prodOptId);
    await onChangeState("isdn")(params.phone);
  }
  useEffect(() => {
    getCity();
    setDefault();
  }, []);
  const onChangeDistrict = (city) => {
    getDistrict(city);
  };

  const onChangeKhoroo = () => {
    getKhoroo();
  };
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  // const handleContractPress = () =>{
  //   navToContract() 
  // }

  // const navToContract = (route) => {
  //   navigation.navigate("CustomerMez", { params: route });
  // }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppLoader visible={false} />
        <AppText
          style={[Styles.textDarkBlue, Styles.fontWeight400, width > 700 ? Styles.text28 : Styles.text16]}
        >
          Хэрэглэгчийн бүртгэл шинэчилэх
        </AppText>
        {info && <AppText style={Styles.textRed}>{info}</AppText>}
        <View>
          {dealerId && <AppTextInfo>{dealerCode}</AppTextInfo>}
          <AppTextInput
            onChangeText={onChangeState("lname")}
            label="Эцэг/эх - ийн нэр"
            // keyboardType="numeric"
            value={parentState.lname}
          />
          <AppTextInput
            onChangeText={onChangeState("fname")}
            label="Хэрэглэгчийн нэр"
            // keyboardType="numeric"
            value={parentState.fname}
          />
          <AppTextInput
            onChangeText={onChangeState("register")}
            label="Регистрийн дугаар "
            // keyboardType="numeric"
            value={parentState.register}
          />
          <AppTextInput
            onChangeText={onChangeState("civilid")}
            label="Civil Id"
            // keyboardType="numeric"
            value={parentState.civilId}
          />
          {/* <AppTextInput
            onChangeText={onChangeState("isEam")}
            label="Имэйл хаягтай эсэх"
            // keyboardType="numeric"
            value={parentState.amount}
          /> */}
          <AppText
            style={[Styles.text12, Styles.fontWeight500, Styles.letterSpace05]}
          >
            Имэйл хаягтай эсэх
          </AppText>
          <Switch
            style={[{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }]}
            trackColor={{ false: "#FFFFFF", true: "#E81E25" }}
            ios_backgroundColor="white"
            onValueChange={toggleSwitch}
            value={switchValue}
          ></Switch>
          {switchValue === true && (
            <AppTextInput
              onChangeText={onChangeState("amount")}
              label="Имэйл хаяг"
              keyboardType="numeric"
              value={parentState.amount}
            />
          )}
          <CityPicker
            label="Хот/аймаг"
            items={cities.result}
            placeholder="сонгох"
            selectedItem={city}
            onSelectItem={(item) => {
              setCity(item);
              setParams("city")(item.cityName);
              onChangeDistrict(item.cityId);
            }}
          />
          {districts.result !== undefined && (
            <DistrictPicker
              label="Сум/дүүрэг"
              items={districts.result}
              placeholder="сонгох"
              selectedItem={district}
              onSelectItem={(item) => {
                setDistrict(item);
                setParams("district")(item.districtName);
                onChangeKhoroo(item.districtId);
              }}
            />
          )}
          <KhorooPicker
            label="Хороо/баг"
            items={khoroos.result}
            placeholder="сонгох"
            selectedItem={khoroo}
            onSelectItem={(item) => {
              setKhoroo(item);
              setParams("khoroo")(item.khorooName);
            }}
          />
          <AppTextInput
            onChangeText={onChangeState("apartment")}
            label="Гудамж/байр"
            // keyboardType="numeric"
            value={parentState.apartment}
          />
          <AppTextInput
            onChangeText={onChangeState("build")}
            label="Тоот"
            // keyboardType="numeric"
            value={parentState.door}
          />
          <AppText></AppText>
          <AppText>Холбоо барих хүн 1</AppText>
          <AppTextInput
            onChangeText={onChangeState("contact1name")}
            label="Нэр"
            // keyboardType="numeric"
            value={parentState.contactName}
          />
          <AppTextInput
            onChangeText={onChangeState("contact1phone")}
            label="Утас"
            keyboardType="numeric"
            value={parentState.contactNumber}
          />
        </View>
        {/* <AppButton onPress={handleContractPress} title="Гэрээ байгуулах" /> */}
      </ScrollView>
    </>
  );
}

export default WithSale(Info);
