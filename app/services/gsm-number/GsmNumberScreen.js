import React, { useState, useEffect } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import product from "../../api/product";
import customer from "../../api/customerRegister";
import sell from "../../api/sell";
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
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Styles from "../../resources/Styles";
import { useNavigation } from "@react-navigation/core";
import {
  FlatList,
  ScrollView,
  Switch,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Constants from "../../resources/Constants";
import { homeIcons } from "../../assets/Images";
import AppPicker from "../../components/AppPicker";
import AppPicker1 from "../../components/AppPicker1";
import AppButton1 from "../../components/AppButton1";
import cityApi from "../../api/cities";
import districtApi from "../../api/districts";
import khorooApi from "../../api/khoroos";
import CityPicker from "../customer-register/CityPicker";
import DistrictPicker from "../customer-register/DistrictPicker";
import KhorooPicker from "../customer-register/KhorooPicker";
import upload from "../../api/upload";
import { searchIcons } from "../../assets/Images";
import AppModal from "../../components/AppModal";
import * as ImagePicker from "expo-image-picker";
import civilId from "../../api/civilId";
import mezPreview from "../../api/mez";
import getnumberlists from "../../api/numberList";
import getSearchIsdn from "../../api/searchIsdn ";
import useUserInfo from "../../hooks/useUserInfo";
import dsignApi from "../../api/dsign";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import ContactRelationPicker from "../customer-register/ContactRelationPicker";

const { width } = Dimensions.get("window");

const isdnList = [
  { value: "85******", label: "85" },
  { value: "94******", label: "94" },
  { value: "95******", label: "95" },
  { value: "99******", label: "99" },
];
const foreignerList = [
  { value: 0, label: "Монгол", foreigner: false },
  { value: 1, label: "Гадаад", foreigner: true },
];

// const gender = [
//   { value: 1, label: "Эрэгтэй" },
//   { value: 0, label: "Эмэгтэй" },
// ];

const infoChannels = [
  {
    id: "36981",
    option: "Телевизийн зар сурталчилгаа",
  },
  {
    id: "36979",
    option: "Ажилтан 1+1",
  },
  {
    id: "36977",
    option: "Ваучер",
  },
  {
    id: "36989",
    option: "Гэр бүл, найз нөхөд",
  },
  {
    id: "36975",
    option: "Органик",
  },
  {
    id: "36987",
    option: "Оутбонд",
  },
  {
    id: 36983,
    option: "СМС Броадкаст",
  },
  {
    value: 36985,
    label: "Сошиал зар сурталчилгаа",
  },
];

function GsmNumberScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState(1);
  const [info, setInfo] = useState();
  const [info1, setInfo1] = useState();
  const [phone, setPhone] = useState();
  const [datas, setDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState();
  const [infoChannel, setInfoChannel] = useState();
  const [isLoadUser, setIsLoadUser] = useState(false);
  const { request: getInventories, loading: inventoriesLoading } = useApi(
    product.getInventories
  );

  const {
    request: numberChangeStatus,
    data: numberStatusChange,
    loading: numberStatusLoading,
  } = useApi(customer.numberChangeStatus);
  const {
    request: getRateplans,
    data: rateplanList,
    loading: rateplanLoading,
  } = useApi(customer.getRateplans);
  const {
    request: numberChangeStatus2,
    data: numberStatusChange2,
    loading: numberStatusLoading2,
  } = useApi(customer.numberChangeStatus2);
  const {
    request: uploadData,
    data: uploadResult,
    loading: uploadLoading,
  } = useApi(upload.uploadFile);

  const { request: getPreview, loading: prewLoading } = useApi(sell.preview);
  const [register, setRegister] = useState();
  const [prodOptId, setProdOptId] = useState();
  const [prefix, setPrefix] = useState({ value: "94******", label: "94" });
  const [isdnSuffix, setIsdnSuffix] = useState("");
  const [foreigner, setforeigner] = useState();
  // const [sex, setSex] = useState()
  const [selectedPackage, setSelectedPackage] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [khoroo, setKhoroo] = useState();
  const [isCivilId, setIsCivilId] = useState("");
  const [isPreviewMez, setIsPreviewMez] = useState();

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

  const [lname, setLname] = useState();
  const [fname, setFname] = useState();
  const [apartment, setApartment] = useState();
  const [door, setDoor] = useState();
  const [email, setEmail] = useState();
  const [contactName, setContactName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [parentNumber1, setparentNumber1] = useState();
  const [parentNumber2, setparentNumber2] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchImsi, setSearchImsi] = useState("");
  const [isRatePlan, setIsRatePlan] = useState();
  const [loadNumberList, setLoadNumberList] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { userData, setUserData } = useUserInfo();
  const [current, setCurrent] = useState(false);
  const [confirmIsdn, setConfirmIsdn] = useState("");
  const [isEditable, setIsEditable] = useState();
  const [prsta, setPrsta] = useState();

  const onChangeDistrict = (city) => {
    getDistrict(city);
  };

  const onChangeKhoroo = (districtId) => {
    getKhoroo(districtId);
  };
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  const setDefault = async () => {
    await setProdOptId(params.prodOpt?.prodOptId || params.option?.prodOptId);
  };

  const handleContractPress = () => {
    navToContract();
  };

  const navToContract = (route) => {
    navigation.navigate("NumberMez", { params: route });
  };

  // ...

  const dsign = () => {
    if (current == true) {
      Alert.alert("Тоон гарын үсэг нэхэмжилсэн");
      dsignApi
        .dsign({ isdn: confirmIsdn, register: userData.register })
        .then((res) => {
          console.log("res================", res);
          if (res.data.code == "0") {
            Alert.alert("Тоон гарын үсэг амжилттай баталгаажлаа");
            setIsEditable(false);
            const xyp = res.data.xypinfo.passport;

            // Limit addressStreetName to 20 characters
            const limitedAddressStreetName = xyp.addressStreetName.substring(
              0,
              40
            );

            setUserData("xyp")(res.data.xypinfo.passport);
            setFname(xyp.firstname);
            setLname(xyp.lastname);
            setCity(xyp.aimagCityName);
            setDistrict(xyp.soumDistrictName);
            setKhoroo(xyp.bagKhorooName);
            setApartment(limitedAddressStreetName);
            setDoor(xyp.addressDetail);
          } else if (res.data.code == "500" || res.data.code == "400") {
            Alert.alert("Гарын үсэг баталгаажсангүй");
          }
        });
    } else if (current == false) {
      setIsEditable(true);
    }
  };

  // ...

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
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
    setDefault();
    getCity();
    getInventories({
      status: 1,
      offset: 0,
      limit: 400,
      productId: params.prodOpt?.productId || params.option?.productId,
    })
      .then((res) => {
        if (res.code === 200) {
          let tempData = [];
          res.result.map((m) => {
            tempData.push({ value: m.invId.toString(), label: m.invUid });
          });
          setDatas(tempData);
          setSearchData(tempData);
          if (res.result.length === 1) {
            setData({
              value: res.result[0].invId.toString(),
              label: res.result[0].invUid,
            });
          }
        } else {
          setInfo({
            desc: res.info
              ? res.info
              : "Сим картны мэдээлэл авахад алдаа гарлаа.",
          });
        }
      })
      .catch((error) => {
        setInfo({ desc: "Сим картны мэдээлэл авахад алдаа гарлаа." });
      });
  }, []);

  const handlePress1 = () => {
    if (phone === undefined || phone === "")
      return Alert.alert("Утасны дугаараа сонгоно уу !");
    if (!data || !data.label) return Alert.alert("IMSI дугаараа сонгоно уу !");

    numberChangeStatus(phone)
      .then((response) => {
        if (response.code === 0) {
          setIsLoadUser(true);
          setInfo(null);
          setStatus(2);
        } else {
          setInfo({ desc: response.info });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handlePress2 = () => {
    civilId.getCivildId(register).then((res) => {
      console.log("res==============", res);
      if (res.data.civilId === "" || res.data.civilId === null) {
        setIsCivilId("");
      } else {
        setIsCivilId(res.data.civilid);
      }
    });

    // test

    if (!foreigner) return Alert.alert("Улсаа сонгоно уу !");

    if (register === undefined || register === "")
      return Alert.alert("Регистрийн дугаар оруулна уу !");

    if (selectedPackage === null || selectedPackage === undefined)
      return Alert.alert("Багцаа сонгоно уу !");

    numberChangeStatus2({
      number: phone,
      register,
      foreigner,
      selectedPackage: selectedPackage.group_id,
    }).then((response) => {
      if (response.info === "OK") {
        setStatus(3);
      } else {
        setInfo1(response.info);
      }
    });
  };

  const paginationNumberList = async () => {
    setLoading(true);
    try {
      const res = await getnumberlists.getNumberLists(
        prefix.value,
        offset,
        limit
      );
      if (res.data && res.data.result && Array.isArray(res.data.result)) {
        setLoadNumberList(res.data.result);
        setOffset((prevOffset) => prevOffset + parseInt(res.data.limit));
        setTotalPages(Math.ceil(res.data.total / limit));
      } else {
        console.error(
          "Invalid response format or result is not an array:",
          res
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchIsdn = async () => {
    if (!prefix.value) return Alert.alert("Дугаараа сонгоно уу");

    setLoading(true);

    const repLace = prefix.value;
    const index = 2;
    const newValue = isdnSuffix;
    const results = [];
    const totalNumberOfOffsets = 1;

    try {
      for (
        let currentOffset = 0;
        currentOffset < totalNumberOfOffsets;
        currentOffset += limit
      ) {
        const updatedValue =
          repLace.slice(0, index) + newValue + repLace.slice(index + newValue);

        const res = await getSearchIsdn.getSearchIsdn(
          updatedValue,
          currentOffset,
          limit
        );
        if (res.data && res.data.result && Array.isArray(res.data.result)) {
          results.push(...res.data.result);
        } else {
          console.error(
            "Invalid response format or result is not an array:",
            res
          );
        }
      }
      // if(results?.length === 0) {
      // Alert.alert("Дугаар олдсонгүй")
      // } else {
      setLoadNumberList(results);
      setTotalPages(Math.ceil(results.length / limit));
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    paginationNumberList();
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page === currentPage) {
    } else {
      setCurrentPage(page);
      const newOffset = page * limit;
      paginationNumberList(newOffset);
    }
  };

  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 3));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageClick(i)}
          style={[
            styles.paginationButton,
            currentPage === i ? styles.activePaginationButton : null,
          ]}
        >
          <Text style={{ color: "white" }}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  const handlePress3 = async () => {
    const sendData = {
      prodOptId,
      isdn: phone,
      rateplan: selectedPackage.code,
      isForeigner: foreigner.value,
      register,
      fname,
      lname,
      city: city.cityName || userData.xyp.aimagCityName,
      district: district.districtName || userData.xyp.soumDistrictName,
      khoroo: khoroo.khorooName || userData.xyp.bagKhorooName,
      apartment: door,
      build: apartment,
      skipBO: true,
      email: email ? email : "nomail@nomail.mn",
      contact1name: contactName,
      contact1phone: contactNumber,
      invIds: [Number(data.value)],
      invUid: data.label,
      buhel: "",
      passRead: false,
      paymentType: 0,
      contractpath: "8",
      isFRegister: 0,
      get_mez: params?.params?.parameter1,
      contractpath: isPreviewMez,
      civilId: isCivilId,
      infoFrom: infoChannel.id,
      channel: "dealerapp",
      parent1: parentNumber1,
      parent2: parentNumber2,
      gsignread: current,
    };
    {
      isRatePlan === "false"
        ? await mezPreview
            .mezPreview(
              register,
              lname,
              fname,
              params?.params?.parameter2,
              foreigner.foreigner
            )
            .then((res) => {
              setIsPreviewMez(res.data.contractpath);
            })
        : null;
    }

    if (current != false) {
      getPreview(sendData).then((resp) => {
        if (resp.code === 200) {
          setInfo1(null);
          navigation.navigate("NumberInfo", {
            ...sendData,
            productPrice: resp.result.payAmount,
            promoPrice: resp.result.totalAmount,
            promoDesc: resp.result.promoProduct?.promo?.promoName,
            rateplan: resp.result.rateplan,
          });
        } else {
          setInfo1(resp.info);
        }
      });
    } else {
      getPreview(sendData).then((resp) => {
        if (resp.code === 200) {
          setInfo1(null);
          setStatus(4);
        } else {
          setInfo1(resp.info);
        }
      });
    }
  };

  const handlePress4 = async () => {
    if (!image1) return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");

    if (!image2) return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");

    let files = [];

    await uploadData(image1).then((response) => {
      files.push(response.result);
    });
    await uploadData(image2).then((response2) => {
      files.push(response2.result);
    });

    const sendData = {
      prodOptId,
      isdn: phone,
      rateplan: selectedPackage.code,
      isForeigner: foreigner.value,
      register,
      fname,
      lname,
      city: city.cityName || userData.xyp.aimagCityName,
      district: district.districtName || userData.xyp.soumDistrictName,
      khoroo: khoroo.khorooName || userData.xyp.bagKhorooName,
      apartment: door,
      build: apartment,
      skipBO: true,
      email: email ? email : "nomail@nomail.mn",
      contact1name: contactName,
      contact1phone: contactNumber,
      invIds: [Number(data.value)],
      invUid: data.label,
      buhel: "",
      passRead: false,
      paymentType: 0,
      contractpath: "8",
      isFRegister: 0,
      get_mez: params?.params?.parameter1,
      contractpath: isPreviewMez,
      civilId: isCivilId,
      infoFrom: infoChannel.id,
      parent1: parentNumber1,
      parent2: parentNumber2,
      channel: "dealerapp",
      files,
      gsignread: current,
    };

    getPreview(sendData).then((resp) => {
      if (resp.code === 200) {
        setInfo1(null);
        navigation.navigate("NumberInfo", {
          ...sendData,
          productPrice: resp.result.payAmount,
          promoPrice: resp.result.totalAmount,
          promoDesc: resp.result.promoProduct?.promo?.promoName,
          rateplan: resp.result.rateplan,
        });
      } else {
        setInfo1(resp.info);
      }
    });
  };

  const handleCancel = () => {
    navigation.navigate("Home", { screen: "Product" });
  };
  const handleRegister = () => {
    if (!foreigner) return Alert.alert("Улсаа сонгоно уу !");
    if (register === undefined || register === "")
      return Alert.alert("Регистрийн дугаар оруулна уу !");

    getRateplans({ isdn: phone, register, isForeigner: foreigner.value }).then(
      (res) => {
        console.log("res=============", res);
        setIsRatePlan(res.mez);
        setPrsta(res.result[0].code);
        if (res.info !== "OK") {
          setInfo1(res.info);
        } else {
          setInfo1(null);
        }
      }
    );
  };

  const renderItem = (data) => {
    return (
      <TouchableHighlight onPress={() => setSelectedPackage(data.item)}>
        <View
          style={[
            Styles.bgWhite,
            Styles.borderRadius12,
            Styles.p14,
            Styles.blueShadow,
            selectedPackage && selectedPackage.group_id === data.item.group_id
              ? Styles.borderRed3
              : Styles.borderWhite,
            {
              borderRadius: 24,
              height: 200,
              width: 200,
              marginLeft: 16,
              color: "white",
            },
          ]}
        >
          <View>
            <Text
              style={[
                Styles.fontWeight500,
                Styles.textDarkBlue80,
                Styles.text20,
                Styles.letterSpace05,
                {
                  textAlign: "left",
                  marginBottom: 10,
                },
              ]}
            >
              {data.item.group_name}
            </Text>

            {data.item.infos.map((item) => {
              return (
                <View key={item.id}>
                  <Text
                    style={[
                      width > 700 ? Styles.text20 : Styles.text12,
                      Styles.fontWeight500,
                      Styles.textBlue2,
                      Styles.letterSpace05,
                    ]}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={[
                      width > 700 ? Styles.text20 : Styles.text12,
                      Styles.fontWeight500,
                      Styles.textBlue2,
                      Styles.letterSpace05,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.line}></Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <AppContent>
      <KeyboardAvoidingView
        style={Styles.container}
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
            Урьдчилсан төлбөрт шинэ дугаар
          </Text>
          <Text></Text>
          <View style={[{ height: 50, marginTop: 8 }]}>
            <View style={[Styles.row, { justifyContent: "space-between" }]}>
              <View style={[{ width: width / 4 }]}>
                <Text
                  style={[Styles.text10, { color: Constants.COLOR_CODE.red }]}
                >
                  Дугаар сонгох
                </Text>
              </View>
              <View style={[{ width: width / 4 }, Styles.center]}>
                <Text
                  style={[
                    Styles.text10,
                    {
                      color:
                        status !== 1
                          ? Constants.COLOR_CODE.red
                          : Constants.COLOR_CODE.gray,
                    },
                  ]}
                >
                  Багц сонгох
                </Text>
              </View>
              <View style={[{ width: width / 4, alignItems: "flex-end" }]}>
                <Text
                  style={[
                    Styles.text10,
                    {
                      color:
                        status === 3 || status === 4
                          ? Constants.COLOR_CODE.red
                          : Constants.COLOR_CODE.gray,
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
                source={homeIcons[status !== 1 ? "dotRed" : "dotGray"]}
              />
              <View
                style={[
                  styles.progressLine,
                  {
                    backgroundColor:
                      status === 3 || status === 4
                        ? Constants.COLOR_CODE.red
                        : Constants.COLOR_CODE.gray,
                  },
                ]}
              />
              <Image
                style={[Styles.center, { margin: 2, height: 14, width: 14 }]}
                source={
                  homeIcons[status === 3 || status === 4 ? "dotRed" : "dotGray"]
                }
              />
            </View>
          </View>
          {info && <AppText style={Styles.textRed}>{info.desc}</AppText>}
          {status === 1 && (
            <>
              <Text
                style={[
                  Styles.textDarkBlue,
                  width > 700 ? Styles.text20 : Styles.text12,
                  Styles.fontWeight400,
                  { marginTop: 20 },
                ]}
              >
                IMSI дугаар сонгох
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View style={{ width: "80%" }}>
                  <AppPicker
                    items={searchData}
                    placeholder="сонгох"
                    selectedItem={data}
                    onSelectItem={(item) => {
                      setData(item);
                    }}
                  />
                </View>
                <View style={{ width: "20%", paddingLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[
                      Styles.center,
                      Styles.row,
                      Styles.borderBlue2,
                      Styles.borderRadius14,
                      Styles.p14,
                    ]}
                  >
                    <Image
                      style={[width > 700 ? Styles.icon32 : Styles.icon20]}
                      source={searchIcons.search}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          {status !== 1 && (
            <>
              <Text
                style={[
                  Styles.textDarkBlue,
                  width > 700 ? Styles.text20 : Styles.text12,
                  Styles.fontWeight400,
                  { marginTop: 10 },
                ]}
              >
                Сонгосон IMSI дугаар
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
                    { color: Constants.COLOR_CODE.white, textAlign: "center" },
                  ]}
                >
                  {data.label}
                </Text>
              </View>
            </>
          )}
          {phone && (
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
                    { color: Constants.COLOR_CODE.white, textAlign: "center" },
                  ]}
                >
                  {phone}
                </Text>
              </View>
            </>
          )}
          {selectedPackage && (
            <>
              <Text
                style={[
                  Styles.textDarkBlue,
                  width > 700 ? Styles.text20 : Styles.text12,
                  Styles.fontWeight400,
                  { marginTop: 10 },
                ]}
              >
                Сонгосон багц
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
                    { color: Constants.COLOR_CODE.white, textAlign: "center" },
                  ]}
                >
                  {selectedPackage.code}
                </Text>
              </View>
            </>
          )}

          {status === 1 && (
            <>
              <Text
                style={[
                  Styles.textDarkBlue,
                  width > 700 ? Styles.text20 : Styles.text12,
                  Styles.fontWeight400,
                  { marginTop: 20 },
                ]}
              >
                Дугаараа сонгоно уу
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View style={{ width: "20%", padding: 0 }}>
                  <AppPicker1
                    items={isdnList}
                    selectedItem={prefix}
                    onSelectItem={(item) => {
                      setPrefix(item);
                    }}
                  ></AppPicker1>
                </View>
                <View
                  style={{
                    width: "50%",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <AppTextInput
                    value={isdnSuffix}
                    onChangeText={(item) => setIsdnSuffix(item)}
                    keyboardType="numeric"
                    autoFocus
                    maxLength={6}
                  />
                </View>
                <View style={{ width: "30%", padding: 0, marginTop: 0 }}>
                  <AppButton1 onPress={handleSearchIsdn} title="Хайх" />
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: "column",
                  height: 300,
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="rgba(101,129,175,1)" />
                ) : (
                  <>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      numColumns={3}
                      style={{ marginTop: 10, width: width - 30, height: 130 }}
                      data={loadNumberList}
                      keyExtractor={(item) => item.number.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          activeOpacity={Styles.opacity60.opacity}
                          style={{ padding: 5 }}
                          onPress={() => {
                            setPhone(item.number);
                          }}
                        >
                          <View
                            style={[
                              Styles.borderRadius12,
                              Styles.borderPurple,
                              styles.numberBox,
                            ]}
                          >
                            <Text
                              style={{
                                color: Constants.COLOR_CODE.black24,
                                textAlign: "center",
                              }}
                            >
                              {item.number}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      {renderPaginationButtons()}
                    </View>
                  </>
                )}
              </View>
              <AppButton
                onPress={handlePress1}
                title="Үргэлжлүүлэх"
                disabled={!phone || !data || !data.label}
              />
            </>
          )}
          {status === 2 && (
            <>
              {info1 && <AppText style={Styles.textRed}>{info1}</AppText>}
              <AppPicker
                label="Улс"
                items={foreignerList}
                selectedItem={foreigner}
                onSelectItem={(item) => {
                  setforeigner(item);
                }}
              />
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View
                  style={{
                    width: "70%",
                    paddingLeft: 0,
                    paddingRight: 10,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <AppTextInput
                    onChangeText={(register) => {
                      setRegister(register), setUserData("register")(register);
                    }}
                    label="Регистрийн дугаар"
                    value={register}
                    autoFocus
                  />
                </View>
                <View style={{ width: "30%", padding: 0, marginTop: 25 }}>
                  <AppButton1 onPress={handleRegister} title="Хайх" />
                </View>
              </View>

              <View>
                <AppLoader visible={rateplanLoading} />
                {rateplanList && rateplanList.result && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{ marginTop: 10, width: width - 30, height: 210 }}
                    data={rateplanList.result}
                    keyExtractor={(item) => item.group_id.toString()}
                    renderItem={(item) => renderItem(item)}
                  />
                )}
              </View>
              <AppButton
                onPress={handlePress2}
                title="Үргэлжлүүлэх"
                disabled={!selectedPackage}
              />
            </>
          )}
          {status === 3 && (
            <>
              {info1 && <AppText style={Styles.textRed}>{info1}</AppText>}
              <AppText style={{ marginBottom: 10, fontSize: 12 }}>
                Баталгаажуулах төрөл
              </AppText>
              <RadioButtonGroup
                containerStyle={{ marginBottom: 10 }}
                selected={current}
                onSelected={(value) => {
                  setCurrent(value);
                }}
                radioBackground="red"
              >
                <RadioButtonItem value={true} label="G-Sign" />
                <Text></Text>
                <RadioButtonItem
                  value={false}
                  label="Иргэний үнэмлэх хавсаргах"
                />
              </RadioButtonGroup>
              {current == true ? (
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
              />
              <AppTextInput
                onChangeText={(e) => setFname(e)}
                label="Хэрэглэгчийн нэр"
                value={fname}
              />
              <AppTextInput
                label="Регистрийн дугаар"
                value={register}
                enabled={false}
              />
              {/* <AppPicker
                label="Хүйс"
                items={gender}
                selectedItem={sex}
                onSelectItem={(item) => {
                  setSex(item);
                }}
              /> */}
              <AppTextInput
                onChangeText={(isCivilId) => setIsCivilId(isCivilId)}
                label="Иргэний бүртгэлийн дугаар"
                value={isCivilId}
                // some
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
              <Switch
                style={[{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }]}
                trackColor={{ false: "#FFFFFF", true: "#E81E25" }}
                ios_backgroundColor="white"
                onValueChange={toggleSwitch}
                value={switchValue}
              ></Switch>
              {switchValue === true && (
                <AppTextInput
                  onChangeText={(e) => setEmail(e)}
                  label="Имэйл хаяг"
                  keyboardType="numeric"
                  value={email}
                />
              )}
              {current == true ? (
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

              {current == false && districts.result !== undefined ? (
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
              {current == true ? (
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
                maxLength={20}
                onChangeText={(e) => setApartment(e)}
                label="Гудамж/байр"
                value={apartment}
              />
              <AppTextInput
                onChangeText={(e) => setDoor(e)}
                label="Тоот"
                value={door}
              />
              <AppText></AppText>
              <AppText>Холбоо барих хүн 1</AppText>
              <AppTextInput
                onChangeText={(e) => setContactName(e)}
                label="Нэр"
                value={contactName}
              />
              <AppTextInput
                onChangeText={(e) => setContactNumber(e)}
                label="Утас"
                keyboardType="numeric"
                value={contactNumber}
              />
              <>{console.log(userData.infoChannel)}</>
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
                  // editable={isEditable}
                />
              )}

              {prsta === "PRSTA" ? (
                <>
                  <AppText>Эцэг эхийн дугаар 1</AppText>
                  <AppTextInput
                    onChangeText={(e) => setparentNumber1(e)}
                    label="Утас"
                    keyboardType="numeric"
                    value={parentNumber1}
                  />
                  <AppText>Эцэг эхийн дугаар 2</AppText>
                  <AppTextInput
                    onChangeText={(e) => setparentNumber2(e)}
                    label="Утас"
                    keyboardType="numeric"
                    value={parentNumber2}
                  />
                </>
              ) : (
                <></>
              )}
              {isRatePlan === "false" ? (
                <>
                  <AppButton
                    title="Гэрээ байгуулах"
                    onPress={handleContractPress}
                  />
                </>
              ) : (
                <></>
              )}
              <AppButton
                onPress={handlePress3}
                title="Үргэлжлүүлэх"
                disabled={
                  !lname ||
                  !fname ||
                  !register ||
                  !city ||
                  !district ||
                  !khoroo ||
                  !apartment ||
                  !door ||
                  !contactName ||
                  !contactNumber
                }
              />
            </>
          )}

          {current == false && (
            <>
              {status === 4 && (
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
                  <Text></Text>
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
                  <AppButton
                    onPress={handlePress4}
                    title="Үргэлжлүүлэх"
                    disabled={!image1 || !image2}
                  />
                </>
              )}
            </>
          )}
          <AppButton
            onPress={handleCancel}
            style={Styles.bgGray}
            title="Цуцлах"
          />

          <AppModal
            title="Хайх утгаа оруулна уу"
            isVisible={modalVisible}
            successText="OK"
            onDismiss={() => {
              setModalVisible(false);
              setSearchImsi("");
              setSearchData(datas);
            }}
            onSuccess={() => {
              setModalVisible(false);
              if (searchImsi === "") {
                setSearchData(datas);
                setData({});
              } else {
                const selectedDatas = datas.filter(
                  (f) => f.label.indexOf(searchImsi) > -1
                );
                setSearchData(
                  datas.filter((f) => f.label.indexOf(searchImsi) > -1)
                );
                if (
                  datas.filter((f) => f.label.indexOf(searchImsi) > -1)
                    .length === 1
                ) {
                  setData(selectedDatas[0]);
                } else {
                  setData({});
                }
              }
            }}
          >
            <AppTextInput
              value={searchImsi}
              onChangeText={(item) => {
                setSearchImsi(item);
                setSearchData(datas.filter((f) => f.label.indexOf(item) > -1));
              }}
              autoFocus
              maxLength={20}
            />
            <ScrollView
              style={[{ height: 200 }]}
              showsVerticalScrollIndicator={false}
            >
              {searchData.map((m, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchImsi(m.label);
                  }}
                >
                  <Text
                    onSelectItem
                    style={[Styles.textBlue2, Styles.mTB6]}
                    key={index}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </AppModal>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppContent>
  );
}

const styles = StyleSheet.create({
  paginationButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "rgba(101,129,175,1)",
    borderRadius: 5,
  },
  activePaginationButton: {
    backgroundColor: "red",
  },
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
    width: (width - 40) / 3,
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
});

export default GsmNumberScreen;
