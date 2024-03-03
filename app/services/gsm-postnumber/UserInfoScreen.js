import React, { useState, useEffect } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import product from "../../api/product";
import customer from "../../api/customerRegister";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import {
  Dimensions,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Styles from "../../resources/Styles";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "../../resources/Constants";
import { homeIcons } from "../../assets/Images";
import AppButton1 from "../../components/AppButton1";
import cityApi from "../../api/cities";
import districtApi from "../../api/districts";
import khorooApi from "../../api/khoroos";
import dsignApi from "../../api/dsign";
import contractApi from "../../api/contract";
import CityPicker from "../customer-register/CityPicker";
import DistrictPicker from "../customer-register/DistrictPicker";
import KhorooPicker from "../customer-register/KhorooPicker";
import upload from "../../api/upload";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
const { width } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import useUserInfo from "../../hooks/useUserInfo";
import ContactRelationPicker from "../customer-register/ContactRelationPicker";
import sell from "../../api/sell";
import AppModal from "../../components/AppModal";
import storage from "../../auth/storage";

function UserInfoScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState(4);
  const [info1, setInfo1] = useState();
  const [current, setCurrent] = useState();
  const { userData, setUserData } = useUserInfo();
  const { request: getInventories, loading } = useApi(product.getInventories);
  const [lname, setLname] = useState();
  const [fname, setFname] = useState();
  const [apartment, setApartment] = useState();
  const [door, setDoor] = useState();
  const [email, setEmail] = useState();
  const [contactName, setContactName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [contactRels, setContactRels] = useState();
  const [contactRel, setContactRel] = useState();
  const [contactName2, setContactName2] = useState();
  const [contactNumber2, setContactNumber2] = useState();
  const [contactRels2, setContactRels2] = useState();
  const [contactRel2, setContactRel2] = useState();
  const [billPhone, setBillPhone] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [isEditable, setIsEditable] = useState();
  const [confirmIsdn, setConfirmIsdn] = useState("");
  const [infoChannels, setInfoChannels] = useState();
  const [infoChannel, setInfoChannel] = useState();
  const [billTypes, setBillTypes] = useState();
  const [billType, setBillType] = useState();
  const [prodOptId, setProdOptId] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [khoroo, setKhoroo] = useState();
  const [contract, setContract] = useState();

  const simPOS91 = [
    {
      id: "15264",
      option: "USIM",
    },
    {
      id: "31703",
      option: "HalfSIM",
    },
  ];
  const simHYPR1 = [
    {
      id: "12297",
      option: "USIM",
    },
    {
      id: "31028",
      option: "HalfSIM",
    },
  ];
  const simHYPR5 = [
    {
      id: "24830",
      option: "USIM",
    },
    {
      id: "32351",
      option: "HalfSIM",
    },
  ];

  var jsonData = {};
  var jsonFields = {};
  const { resetUserData } = useUserInfo();
  const { request: getPreview, loading: prewLoading } = useApi(sell.preview);
  const {
    request: getPostField,
    data: fieldList,
    loading: fieldLoading,
  } = useApi(customer.getPostField);
  const {
    request: uploadData,
    data: uploadResult,
    loading: uploadLoading,
  } = useApi(upload.uploadFile);
  const { request: loadCity, data: cities } = useApi(cityApi.getCities);
  const getCity = async () => {
    await loadCity();
  };
  const { request: loadDistrict, data: districts } = useApi(
    districtApi.getDistricts
  );
  const getDistrict = async (city) => {
    await loadDistrict(city);
  };
  const { request: loadKhoroo, data: khoroos } = useApi(khorooApi.getKhoroos);
  const getKhoroo = async (districtId) => {
    await loadKhoroo(city.cityId, districtId);
  };

  const onChangeDistrict = (city) => {
    getDistrict(city);
  };

  const onChangeKhoroo = (districtId) => {
    getKhoroo(districtId);
  };

  try {
    const setDefault = async () => {
      await setProdOptId(params.prodOpt.prodOptId);
      setUserData("prodOptId")(params.prodOpt.prodOptId);
    };

    const pickFromGallery = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1.5],
          quality: 0.5,
          base64: true,
        });
        setImage1(data);
      } else {
        Alert.alert("Permission denied");
      }
    };

    const pickFromCamera = async () => {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA);
      if (granted) {
        let data = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1.5],
          quality: 0.5,
          base64: true,
        });
        setImage1(data);
      } else {
        Alert.alert("Permission denied");
      }
    };

    const pickFromGallery2 = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1.5],
          quality: 0.5,
          base64: true,
        });
        setImage2(data);
      } else {
        Alert.alert("Permission denied");
      }
    };

    const pickFromCamera2 = async () => {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA);
      if (granted) {
        let data = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1.5],
          quality: 0.5,
          base64: true,
        });
        setImage2(data);
      } else {
        Alert.alert("Permission denied");
      }
    };

    useEffect(() => {
      setUserData({});
      resetUserData();
      setUserData({});
      setDefault();
      getCity();
      setUserData("current")(current);
    }, []);

    useEffect(() => {
      let addressStreetName;

      if (userData.xyp) {
        addressStreetName = userData.xyp.addressStreetName;
        if (userData?.xyp?.addressStreetName?.length > 39) {
          addressStreetName = userData.xyp.addressStreetName.slice(-39);
          setUserData("addressStreetName")(addressStreetName);
        } else {
          addressStreetName = userData.xyp.addressStreetName;
          setUserData("addressStreetName")(userData.xyp.addressStreetName);
        }
      }
    }, [userData.xyp]);

    useEffect(() => {
      contractApi.postContract().then((res) => {
        if (res.status == "200") {
          setContract(res.data);
        }
      });
      getPostField({ number: userData.phone }).then((response) => {
        if (response.info === "Success") {
          for (let i = 0; i < response.document.fields?.length; i++) {
            if (response.document.fields[i].id == "2645") {
              setContactRels(response.document.fields[i].attributes);
            } else if (response.document.fields[i].id == "2646") {
              setContactRels2(response.document.fields[i].attributes);
            } else if (response.document.fields[i].id == "2646") {
              setContactRels2(response.document.fields[i].attributes);
            } else if (response.document.fields[i].id == "5967") {
              setInfoChannels(response.document.fields[i].attributes);
            } else if (response.document.fields[i].id == "2046") {
              setBillTypes(response.document.fields[i].attributes);
              setUserData("billTypes")(response.document.fields[i].attributes);
            }
          }
        } else {
          setInfo1(response.info);
        }
      });
    }, []);

    const dsign = () => {
      if (current == "dsign") {
        Alert.alert("Тоон гарын үсэг нэхэмжилсэн");
        dsignApi
          .dsign({ isdn: confirmIsdn, register: userData.register })
          .then((res) => {
            if (res.data.code == "0") {
              Alert.alert("Тоон гарын үсэг амжилттай баталгаажлаа");
              setIsEditable(false);
              const xyp = res.data.xypinfo.passport;
              setUserData("xyp")(res.data.xypinfo.passport);
              setFname(xyp.firstname);
              setLname(xyp.lastname);
              setCity(xyp.aimagCityName);
              setDistrict(xyp.addressTownName);
              setKhoroo(xyp.bagKhorooName);
              setApartment(xyp.addressStreetName);
              setDoor(xyp.addressDetail);
            } else if (res.data.code == "500" || res.data.code == "400") {
              Alert.alert("Гарын үсэг баталгаажсангүй");
            }
          });
      } else if (current == "passport") {
        setIsEditable(true);
      }
    };

    const handleContractPress = () => {
      navToContract({ contract });
    };

    const callPreview = async () => {
      var d8 = /^[0-9]{8}$/;
      if (!userData.signature) {
        Alert.alert("Та гэрээ байгуулна уу", userData.signature);
      } else if (!userData.phone) {
        Alert.alert("Утасны дугаараа оруулна уу", userData.phone);
      } else if (!userData.billPhone) {
        Alert.alert("Билл явуулах дугаар оруулна уу", userData.billPhone);
      } else if (!userData.phone) {
        Alert.alert("Холбоо барих хүний нэр оруулна уу", userData.contactName);
      } else if (!userData.contactNumber) {
        Alert.alert(
          "Холбоо барих хүний дугаар оруулна уу",
          userData.contactNumber
        );
      } else if (!userData.imsi) {
        Alert.alert("Шинэ дугаараа оруулна уу", userData.imsi);
      } else if (!userData.register) {
        Alert.alert("Регистрийн дугаар оруулна уу", userData.register);
      } else if (!userData.contactRel) {
        Alert.alert(
          "Холбоо барих хүний холбоо хамаарлыг оруулна уу",
          userData.contactRel
        );
      } else if (!userData.contactRel2) {
        Alert.alert(
          "Холбоо барих хүний холбоо хамаарлыг оруулна уу",
          userData.contactRel2
        );
      } else if (!userData.infoChannel) {
        Alert.alert(
          "Мэдээлэл авсан эх сурвалжийг оруулна уу",
          userData.infoChannel
        );
      } else if (!userData.current) {
        Alert.alert("Баталгаажуулах төрөл өө сонгоно уу:", userData.current);
      } else if (
        !d8.test(userData.contactNumber2) ||
        !d8.test(userData.contactNumber)
      ) {
        Alert.alert("Холбоо барих хүний дугаар 8 оронтой байх ёстой");
      } else if (!d8.test(userData.billPhone)) {
        Alert.alert(
          "Билл авах дугаар 8 оронтой байх ёстой:",
          userData.billPhone
        );
      } else {
        await sendData();
        getPreview(jsonData).then((resp) => {
          if (resp.code === 200) {
            setInfo1("");
            const { payAmount, totalAmount, rateplan } = resp.result;
            navigation.navigate("GsmPostInfo", {
              ...jsonData,
              productPrice: payAmount,
              promoPrice: totalAmount,
              rateplan: rateplan,
            });
          } else {
            setInfo1(resp.info);
          }
        });
      }
    };

    const sendData = async () => {
      let files = [];
      await uploadData({ base64: userData.signature, type: "string" })
        .then((res) => {
          files.push(res.result);
          setUserData("signaturePath")(res.result);
        })
        .catch((e) => console.log("eror on signature upload", e));

      if (userData.current == "passport") {
        await uploadData(image1).then((response1) => {
          files.push(response1.result);
        });
        await uploadData(image2).then((response2) => {
          files.push(response2.result);
        });
      }

      let addressStreetName;

      if (userData.xyp) {
        addressStreetName = userData.xyp.addressStreetName;
        if (userData.xyp.addressStreetName?.length > 39) {
          addressStreetName = userData.xyp.addressStreetName.slice(-39);
          setUserData("addressStreetName")(addressStreetName);
        } else {
          addressStreetName = userData.xyp.addressStreetName;
          setUserData("addressStreetName")(userData.xyp.addressStreetName);
        }
      }

      jsonData["paymentType"] = 0;
      jsonData["autoVat"] = true;
      jsonData["prodOptId"] = userData.prodOptId;
      jsonData["isdn"] = userData.phone;
      jsonData["isForeigner"] = userData.isForeigner;
      jsonData["email"] = userData.email ? userData.email : "nomail@nomail.mn";
      jsonData["contact1name"] = userData.contactName;
      jsonData["contact1phone"] = userData.contactNumber;
      jsonData["invIds"] = [Number(userData.imsi.value)];
      jsonData["invUid"] = userData.imsi.label;
      jsonData["buhel"] = "";
      jsonData["amount"] = "0";
      jsonData["register"] = userData.register;
      jsonData["civilId"] = userData.isCivilId;
      jsonData["files"] = files;
      jsonData["Signature"] = userData.signaturePath;
      jsonData["get_mez"] = false;
      jsonData["isFRegister"] = 0;
      jsonData["infoForm"] = "";
      jsonFields["register"] = { value: userData.register };
      jsonFields["civilId"] = { value: userData.isCivilId };
      jsonFields["email"] = {
        value: userData.email ? userData.email : "nomail@nomail.mn",
      };
      jsonFields["imsi"] = { value: userData.imsi.value };
      jsonFields["phone"] = { value: userData.phone };
      jsonFields["billType"] = {
        value: userData.billType ? userData.billType : "18129",
      };
      jsonFields["contactNumber"] = { value: userData.contactNumber };
      jsonFields["contactNumber2"] = { value: userData.contactNumber2 };
      jsonFields["contactName"] = { value: userData.contactName };
      jsonFields["contactName2"] = { value: userData.contactName2 };
      jsonFields["contactRel"] = { value: userData.contactRel };
      jsonFields["contactRel2"] = { value: userData.contactRel2 };
      jsonFields["infoChannel"] = { value: userData.infoChannel };
      jsonFields["simId"] = { value: userData.sim.id };

      if (userData.current == "dsign") {
        jsonData["fname"] = userData.xyp.firstname;
        jsonData["lname"] = userData.xyp.lastname;
        jsonData["city"] = userData.xyp.aimagCityName;
        jsonData["district"] = userData.xyp.soumDistrictName;
        jsonData["khoroo"] = userData.xyp.bagKhorooName;
        jsonData["apartment"] = userData.addressStreetName;
        jsonData["build"] = userData.xyp.addressDetail;
        jsonData["skipBO"] = true;

        jsonFields["lastname"] = { value: userData.xyp.lastname };
        jsonFields["firstname"] = { value: userData.xyp.firstname };
        jsonFields["aimagCityName"] = { value: userData.xyp.aimagCityName };
        jsonFields["soumDistrictName"] = {
          value: userData.xyp.soumDistrictName,
        };
        jsonFields["bagKhorooName"] = { value: userData.xyp.bagKhorooName };
        jsonFields["addressStreetName"] = { value: userData.addressStreetName };
        jsonFields["addressDetail"] = { value: userData.xyp.addressDetail };
        jsonData["passRead"] = true;
        jsonFields["documentType"] = { value: "37046" };
      } else if (userData.current == "passport") {
        jsonData["fname"] = userData.fname;
        jsonData["lname"] = userData.lname;
        jsonData["city"] = userData.city;
        jsonData["district"] = userData.district;
        jsonData["khoroo"] = userData.khoroo;
        jsonData["apartment"] = userData.apartment;
        jsonData["build"] = userData.door;
        jsonData["skipBO"] = false;

        jsonFields["lname"] = { value: userData.lname };
        jsonFields["fname"] = { value: userData.fname };
        jsonFields["city"] = { value: userData.city };
        jsonFields["district"] = { value: userData.district };
        jsonFields["khoroo"] = { value: userData.khoroo };
        jsonFields["apartment"] = { value: userData.apartment };
        jsonFields["door"] = { value: userData.door };
        jsonFields["documentType"] = { value: "22252" };
        jsonData["passRead"] = false;
      }
      if (userData.package == "760") {
        jsonData.rateplan = "HYPR1";
        setUserData("rateplan")("HYPR1");
        for (let i = 0; i < simHYPR1?.length; i++) {
          if (userData.sim.option == simHYPR1[i].option) {
            jsonFields["simTypeId"] = simHYPR1[i].id;
          }
        }
      }
      if (userData.package == "759") {
        jsonData.rateplan = "HYPR5";
        setUserData("rateplan")("HYPR5");
        for (let i = 0; i < simHYPR5?.length; i++) {
          if (userData.sim.option == simHYPR5[i].option) {
            jsonFields["simTypeId"] = simHYPR5[i].id;
          }
        }
      }
      if (userData.package == "758") {
        setUserData("rateplan")("POS91");
        jsonData.rateplan = "POS91";
        for (let i = 0; i < simPOS91?.length; i++) {
          if (userData.sim.option == simPOS91[i].option) {
            jsonFields["simTypeId"] = simPOS91[i].id;
          }
        }
        jsonFields["creditPackId"] = { value: userData.creditPackId };
        jsonFields["dataPackId"] = { value: userData.dataPackId };
        jsonFields["talkPackId"] = { value: userData.talkPackId };
        jsonFields["salesPackId"] = { value: userData.salesPackId };
      }
      jsonData["fields"] = jsonFields;
    };

    const handleCancel = () => {
      navigation.navigate("Home", { screen: "Product" });
    };

    const navToContract = (route) => {
      navigation.navigate("AppContract", route);
    };

    const navToInfo = () => {
      navigation.navigate("PostInfo", params);
    };

    return (
      <AppContent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          keyboardVerticalOffset={0}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <AppLoader visible={loading} />
            <Text
              style={[
                Styles.textDarkBlue,
                width > 700 ? Styles.text28 : Styles.text16,
                Styles.fontWeight400,
              ]}
            >
              Дараа төлбөрт шинэ дугаар
            </Text>
            <Text></Text>
            <View style={[{ height: 50, marginTop: 8 }]}>
              <View style={[Styles.row, { justifyContent: "space-between" }]}>
                <View style={[{ width: width / 5 }]}>
                  <Text
                    style={[
                      Styles.text10,
                      { color: Constants.COLOR_CODE.red, textAlign: "center" },
                    ]}
                  >
                    Дугаар сонгох
                  </Text>
                </View>
                <View style={[{ width: width / 5 }, Styles.center]}>
                  <Text
                    style={[
                      Styles.text10,
                      {
                        color:
                          status < 2
                            ? Constants.COLOR_CODE.gray
                            : Constants.COLOR_CODE.red,
                        textAlign: "center",
                      },
                    ]}
                  >
                    Хэрэглэгч таних
                  </Text>
                </View>
                <View style={[{ width: width / 5, alignItems: "flex-end" }]}>
                  <Text
                    style={[
                      Styles.text10,
                      {
                        color:
                          status < 3
                            ? Constants.COLOR_CODE.gray
                            : Constants.COLOR_CODE.red,
                        textAlign: "center",
                      },
                    ]}
                  >
                    Багц сонгох
                  </Text>
                </View>
                <View style={[{ width: width / 5, alignItems: "flex-end" }]}>
                  <Text
                    style={[
                      Styles.text10,
                      {
                        color:
                          status !== 4
                            ? Constants.COLOR_CODE.gray
                            : Constants.COLOR_CODE.red,
                        textAlign: "center",
                      },
                    ]}
                  >
                    Хэрэглэгчийн мэдээлэл
                  </Text>
                </View>
              </View>
              <View style={[Styles.row, Styles.center, { height: 18 }]}>
                <Image
                  style={[{ margin: 2, height: 14, width: 14 }]}
                  source={homeIcons["dotRed"]}
                />
                <View
                  style={[
                    styles.progressLine,
                    {
                      backgroundColor:
                        status !== 1
                          ? Constants.COLOR_CODE.red
                          : Constants.COLOR_CODE.gray,
                    },
                  ]}
                />
                <Image
                  style={[Styles.center, { margin: 2, height: 14, width: 14 }]}
                  source={homeIcons[status > 2 ? "dotRed" : "dotGray"]}
                />
                <View
                  style={[
                    styles.progressLine,
                    {
                      backgroundColor:
                        status > 2
                          ? Constants.COLOR_CODE.red
                          : Constants.COLOR_CODE.gray,
                    },
                  ]}
                />
                <Image
                  style={[Styles.center, { margin: 2, height: 14, width: 14 }]}
                  source={homeIcons[status > 3 ? "dotRed" : "dotGray"]}
                />
                <View
                  style={[
                    styles.progressLine,
                    {
                      backgroundColor:
                        status > 3
                          ? Constants.COLOR_CODE.red
                          : Constants.COLOR_CODE.gray,
                    },
                  ]}
                />
                <Image
                  style={[Styles.center, { margin: 2, height: 14, width: 14 }]}
                  source={homeIcons[status == 4 ? "dotRed" : "dotGray"]}
                />
              </View>
            </View>

            {userData.phone && (
              <>
                <Text
                  style={[
                    Styles.textDarkBlue,
                    width > 700 ? Styles.text20 : Styles.text12,
                    Styles.fontWeight400,
                    { marginTop: 10 },
                  ]}
                >
                  Сонгосон утасны дугаар
                </Text>
                <View
                  style={{
                    backgroundColor: Constants.COLOR_CODE.red,
                    padding: 8,
                    borderRadius: 12,
                    height: 35,
                    marginTop: 6,
                    width: width - 50,
                  }}
                >
                  <Text
                    style={[
                      Styles.text16,
                      Styles.fontWeight400,
                      Styles.textBold,
                      {
                        color: Constants.COLOR_CODE.white,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {userData.phone}
                  </Text>
                </View>
              </>
            )}

            <View style={{ marginTop: 20 }}>
              <AppText style={{ marginBottom: 10, fontSize: 12 }}>
                Баталгаажуулах төрөл
              </AppText>
              <RadioButtonGroup
                containerStyle={{ marginBottom: 10 }}
                selected={current}
                onSelected={(value) => {
                  setCurrent(value), setUserData("current")(value);
                }}
                radioBackground="red"
              >
                <RadioButtonItem value="dsign" label="G-Sign" />
                <Text></Text>
                <RadioButtonItem
                  value="passport"
                  label="Иргэний үнэмлэх хавсаргах"
                />
              </RadioButtonGroup>
            </View>
            {info1 && <AppText style={Styles.textRed}>{info1}</AppText>}

            {current == "dsign" ? (
              <>
                <AppTextInput
                  onChangeText={(e) => setConfirmIsdn(e)}
                  label="Баталгаажуулах дугаар"
                  value={confirmIsdn}
                  editable={isEditable}
                  keyboardType="numeric"
                />
                <AppButton
                  title="Тоон гарын үсэг хүсэх"
                  onPress={dsign}
                  disabled={confirmIsdn?.length < 8}
                />
              </>
            ) : (
              <></>
            )}
            <AppTextInput
              onChangeText={(e) => {
                setLname(e), setUserData("lname")(e);
              }}
              label="Эцэг/эх - ийн нэр"
              value={lname}
              editable={isEditable}
            />
            <AppTextInput
              onChangeText={(e) => {
                setFname(e), setUserData("fname")(e);
              }}
              label="Хэрэглэгчийн нэр"
              value={fname}
              editable={isEditable}
            />
            <AppTextInput
              label="Регистрийн дугаар"
              value={userData.register}
              enabled={false}
            />
            <AppTextInput
              label="Иргэний бүртгэлийн дугаар"
              value={userData.isCivilId}
              enabled={false}
            />
            <AppText
              style={[
                Styles.text12,
                Styles.fontWeight500,
                Styles.letterSpace05,
              ]}
            >
              Имэйл хаягтай эсэх
            </AppText>
            <ContactRelationPicker
              label="Билл авах суваг"
              items={userData.billTypes}
              placeholder="сонгох"
              selectedItem={billType}
              onSelectItem={(item) => {
                setBillType(item);
                setUserData("billType")(item.id);
              }}
              editable={isEditable}
            />
            {userData.billType == 18122 && (
              <AppTextInput
                onChangeText={(e) => {
                  setEmail(e), setUserData("email")(e);
                }}
                label="Имэйл хаяг"
                keyboardType="numeric"
                value={email}
              />
            )}
            {current == "dsign" ? (
              <AppTextInput
                label="Хот/аймаг"
                value={city}
                onChangeText={(e) => {
                  setCity(e), setUserData("city")(e);
                }}
                editable={isEditable}
              />
            ) : (
              <CityPicker
                label="Хот/аймаг"
                items={cities.result}
                placeholder="сонгох"
                selectedItem={city}
                onSelectItem={(item) => {
                  setCity(item);
                  onChangeDistrict(item.cityId);
                  setUserData("city")(item.cityName);
                }}
                editable={isEditable}
              />
            )}

            {current == "passport" && districts.result !== undefined ? (
              <DistrictPicker
                label="Сум/дүүрэг"
                items={districts.result}
                placeholder="сонгох"
                selectedItem={district}
                onSelectItem={(item) => {
                  setDistrict(item);
                  onChangeKhoroo(item.districtId);
                  setUserData("district")(item.districtName);
                }}
                editable={isEditable}
              />
            ) : (
              <AppTextInput
                label="Сум/дүүрэг"
                value={district}
                onChangeText={(e) => {
                  setDistrict(e), setUserData("district")(e);
                }}
                editable={isEditable}
              />
            )}
            {current == "dsign" ? (
              <AppTextInput
                label="Хороо/баг"
                value={khoroo}
                editable={isEditable}
                onChangeText={(e) => {
                  setKhoroo(e), setUserData("khoroo")(e);
                }}
              />
            ) : (
              <KhorooPicker
                label="Хороо/баг"
                items={khoroos.result}
                placeholder="сонгох"
                selectedItem={khoroo}
                onSelectItem={(item) => {
                  setKhoroo(item);
                  setUserData("khoroo")(item.khorooName);
                }}
                editable={isEditable}
              />
            )}
            <AppTextInput
              onChangeText={(e) => {
                setApartment(e), setUserData("apartment")(e);
              }}
              label="Гудамж/байр"
              value={apartment}
              editable={isEditable}
            />
            <AppTextInput
              onChangeText={(e) => {
                setDoor(e), setUserData("door")(e);
              }}
              label="Тоот"
              value={door}
              editable={isEditable}
            />
            <AppText></AppText>
            <AppTextInput
              onChangeText={(e) => {
                setBillPhone(e), setUserData("billPhone")(e);
              }}
              label="Утас/билл хүлээн авах/"
              value={billPhone}
            />
            <AppText>Холбоо барих хүн 1</AppText>
            <AppTextInput
              onChangeText={(e) => {
                setContactName(e), setUserData("contactName")(e);
              }}
              label="Нэр"
              value={contactName}
            />

            <ContactRelationPicker
              label="Холбоо барих хүн (1) нь таны юу болох "
              items={contactRels}
              placeholder="сонгох"
              selectedItem={contactRel}
              onSelectItem={(item) => {
                setContactRel(item);
                setUserData("contactRel")(item.id);
              }}
              editable={isEditable}
            />
            <Text></Text>
            <AppTextInput
              onChangeText={(e) => {
                setContactNumber(e), setUserData("contactNumber")(e);
              }}
              label="Холбоо барих хүн (1) - Утас"
              keyboardType="numeric"
              value={contactNumber}
            />
            <Text></Text>
            <AppText>Холбоо барих хүн 2</AppText>
            <AppTextInput
              onChangeText={(e) => {
                setContactName2(e), setUserData("contactName2")(e);
              }}
              label="Нэр"
              value={contactName2}
            />
            <ContactRelationPicker
              label="Холбоо барих хүн (2) нь таны юу болох "
              items={contactRels2}
              placeholder="сонгох"
              selectedItem={contactRel2}
              onSelectItem={(item) => {
                setContactRel2(item);
                setUserData("contactRel2")(item.id);
              }}
              editable={isEditable}
            />
            <AppTextInput
              onChangeText={(e) => {
                setContactNumber2(e), setUserData("contactNumber2")(e);
              }}
              label="Холбоо барих хүн (2) - Утас"
              keyboardType="numeric"
              value={contactNumber2}
            />

            {infoChannels && (
              <ContactRelationPicker
                label="Мэдээлэл авсан суваг"
                items={infoChannels}
                placeholder="сонгох"
                selectedItem={infoChannel}
                onSelectItem={(item) => {
                  setInfoChannel(item);
                  setUserData("infoChannel")(item.id);
                }}
                editable={isEditable}
              />
            )}

            {current == "passport" && (
              <>
                <Text></Text>
                <Text
                  style={[
                    Styles.textDarkBlue,
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.fontWeight400,
                  ]}
                >
                  Цахим үнэмлэхний нүүр зураг
                </Text>
                {image1 && (
                  <ImageBackground
                    source={{ uri: image1.uri }}
                    style={{ height: 160, width: width - 50 }}
                    imageStyle={{ borderRadius: 15 }}
                  />
                )}
                <View style={{ flexDirection: "row", marginTop: 6 }}>
                  <View style={{ width: "50%", padding: 0 }}>
                    <AppButton1
                      title="Camera"
                      onPress={() => pickFromCamera()}
                      style={[Styles.bgPurple]}
                    />
                  </View>
                  <View style={{ width: "50%", paddingLeft: 10 }}>
                    <AppButton1
                      title="Gallery"
                      onPress={() => pickFromGallery()}
                      style={[Styles.bgPurple]}
                    />
                  </View>
                </View>
                <Text
                  style={[
                    Styles.textDarkBlue,
                    width > 700 ? Styles.text26 : Styles.text14,
                    Styles.fontWeight400,
                  ]}
                >
                  Цахим үнэмлэхний арын зураг
                </Text>
                {image2 && (
                  <ImageBackground
                    source={{ uri: image2.uri }}
                    style={{ height: 160, width: width - 50 }}
                    imageStyle={{ borderRadius: 15 }}
                  />
                )}
                <View style={{ flexDirection: "row", marginTop: 6 }}>
                  <View style={{ width: "50%", padding: 0 }}>
                    <AppButton1
                      title="Camera"
                      onPress={() => pickFromCamera2()}
                      style={[Styles.bgPurple]}
                    />
                  </View>
                  <View style={{ width: "50%", paddingLeft: 10 }}>
                    <AppButton1
                      title="Gallery"
                      onPress={() => pickFromGallery2()}
                      style={[Styles.bgPurple]}
                    />
                  </View>
                </View>
              </>
            )}

            <AppButton
              onPress={handleContractPress}
              title="Гэрээ байгуулах"
              disabled={current == "passport" && (!image1 || !image2)}
            />
            <AppButton title="Үргэлжлүүлэх" onPress={callPreview} />

            <AppButton
              onPress={handleCancel}
              style={Styles.bgGray}
              title="Цуцлах"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </AppContent>
    );
  } catch (e) {
    console.log("aldaa garsoon::::::::::", e);
  }
}

const styles = StyleSheet.create({
  numberBox: {
    padding: 8,
    borderRadius: 12,
    height: 35,
    width: (width - 80) / 3,
    borderColor: "#99ACCD",
    borderWidth: 1,
  },
  line: {
    height: 1,
    marginLeft: 36,
    marginRight: 36,
    marginTop: 8,
    marginBottom: 8,
    width: width - 72,
  },
  progressLine: {
    height: 2,
    width: (width - 50) / 5,
    marginLeft: 4,
    marginRight: 4,
  },
  containerShortDesc: {
    borderRadius: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  containerDesc: {
    marginTop: 32,
    borderRadius: 18,
  },

  imgEmployee: {
    height: 32,
    width: 32,
    borderRadius: 20,
    margin: 8,
    padding: 5,
  },
  selected: {
    backgroundColor: "#124545",
  },
  warningMessage: {
    backgroundColor: "white",
    color: "red",
    padding: 10,
    borderRadius: 10,
  },
});

export default UserInfoScreen;
