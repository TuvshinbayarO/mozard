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
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import Styles from "../../resources/Styles";
import { useNavigation } from "@react-navigation/core";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Constants from "../../resources/Constants";
import { homeIcons } from "../../assets/Images";
import AppPicker from "../../components/AppPicker";
import AppPicker1 from "../../components/AppPicker1";
import AppButton1 from "../../components/AppButton1";
import cityApi from "../../api/cities";
import dataPackApi from "../../api/dataPack";
import talkPackApi from "../../api/talkPack";
import packApi from "../../api/pack";
import contractApi from "../../api/contract";
import numberLimit from "../../api/numberLimit";
import upload from "../../api/upload";
import { searchIcons } from "../../assets/Images";
import AppModal from "../../components/AppModal";
const { width } = Dimensions.get("window");
import PackagePicker from "./PackagePicker";
import BagtsPicker from "./BagtsPicker";
import useUserInfo from "../../hooks/useUserInfo";
import ContactRelationPicker from "../customer-register/ContactRelationPicker";
import civilId from "../../api/civilId";
import getPostNumberLists from '../../api/postNumberlist'
import getPostSearchIsdn from '../../api/getPostNumberSearch'

const isdnList = [
  { value: "85******", label: "85" },
  { value: "94******", label: "94" },
  { value: "95******", label: "95" },
  { value: "99******", label: "99" },
];

const countryList = [
  { value: 0, label: "Монгол" },
  { value: 1, label: "Гадаад" },
];

const bagtsnuud = [
  { value: 758, name: "Миний Моби Багц" },
];

const hybridPlans = [
  { value: 760, name: 'Hybrid 9900' },
  { value: 759, name: 'Hybrid 14900' }
];

const usageLimit = [
  {
    'id': '33376',
    'option': '20000'
  },
  {
    'id': '25846',
    'option': '40000'
  },
  {
    'id': '37012',
    'option': '200000'
  }
]

const simTypes = [
  {
    "id": "33057",
    "option": "USIM",
  },
  {
    "id": "36973",
    "option": "HalfSIM",
  }
]



function GsmPostnumberScreen({ parentState, onChangeState, route: { params } }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState(1);
  const [info, setInfo] = useState();
  const [info1, setInfo1] = useState();
  const [phone, setPhone] = useState();
  const [datas, setDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState();
  const [isLoadUser, setIsLoadUser] = useState(false);
  const { userData, setUserData } = useUserInfo();
  const [loadNumberList, setLoadNumberList] = useState()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(30)
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [creditPacks, setCreditPacks] = useState()

  const { request: getInventories, loading: LoadInventories } = useApi(product.getInventories);
  const {
    request: numberChangeStatus,
    data: numberStatusChange,
    loading: numberStatusLoading,
  } = useApi(customer.numberChangeStatus);
  const {
    request: getPostField,
    data: fieldList,
    loading: fieldLoading,
  } = useApi(customer.getPostField);
  const { request: uploadData, data: uploadResult, loading: uploadLoading } = useApi(upload.uploadFile);
  const [register, setRegister] = useState();
  const [prodOptId, setProdOptId] = useState();
  const [prefix, setPrefix] = useState({ value: "94******", label: "94" });
  const [isdnSuffix, setIsdnSuffix] = useState('');
  const [country, setCountry] = useState(); //{ value: 0, label: "Монгол" }
  const [bagts, setBagts] = useState()
  const [dataPack, setDataPack] = useState()
  const [dataPacks, setDataPacks] = useState()
  const [talkPack, setTalkPack] = useState()
  const [talkPacks, setTalkPacks] = useState()
  const [creditPack, setCreditPack] = useState()
  const [salesPack, setSalesPack] = useState()
  const [salesPacks, setSalesPacks] = useState()
  const [contract, setContract] = useState()
  const { request: loadCity, data: cities } = useApi(cityApi.getCities);
  const getCity = async () => {
    await loadCity();
  };
  const { request: loadDatas, data: dataPackss } = useApi(dataPackApi.getDataPackss);
  const getDataPacks = async () => {
    await loadDatas(phone);
    if (dataPackss.code == 200) {
      setDataPacks(dataPackss.document.fields[0].attributes)
      setUserData("dataPacks")(dataPackss.document.fields[0].attributes)
    }
  };

  const { request: loadTalks, data: talkPackss } = useApi(talkPackApi.getTalkPackss);
  const getTalkPacks = async () => {
    try {
      await loadTalks(phone);
      if (talkPackss.code == 200) {
        setCreditPacks(packss.document.fields[0].attributes)
        setTalkPacks(talkPackss.document.fields[0].attributes)
        setUserData("talkPacks")(talkPackss.document.fields[0].attributes)
      }
    }
    catch (e) {
      console.log("error;;;;;;;;", e)
    }
  };

  const { request: loadPacks, data: packss } = useApi(packApi.getPackss);
  
  const getPacks = async () => {
    try {
      await loadPacks(phone);
      if (talkPackss.code == 200) {
        setCreditPacks(packss.document.fields[0].attributes)
        setUserData("creditPacks")(packss.document.fields[0].attributes)
        setSalesPacks(packss.document.fields[1].attributes)
        setUserData("salesPacks")(packss.document.fields[1].attributes)
      }
    } catch (e) {
      console.log("error ++++++++++", e)
    }
  }

  const { request: loadHybPacks, data: hybpackss } = useApi(packApi.getHybPackss);
  const getHybPacks = async () => {
    await loadHybPacks(phone);
    if (hybpackss.code == 200) {
      setCreditPacks(hybpackss.document.fields[0].attributes)
      setUserData("salesPacks")(hybpackss.document.fields[1].attributes)
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [searchImsi, setSearchImsi] = useState("");
  const [simType, setSimType] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [isCivilId, setIsCivilId] = useState("");
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const setDefault = (data) => {
    setProdOptId(data);
    setUserData("prodOptId")(data)
  };

  // const getNumberList = async () => {
  //   await getPostpaidNumbers();
  // };

  const paginationNumberList = async () => {
    setLoading(true);
    try {
      const res = await getPostNumberLists.getPostNumberLists(prefix.value, offset, limit);
      if (res.data && res.data.result && Array.isArray(res.data.result)) {
        setLoadNumberList(res.data.result);
        setOffset((prevOffset) => prevOffset + parseInt(res.data.limit));
        setTotalPages(Math.ceil(res.data.total / limit));
      } else {
        console.error('Invalid response format or result is not an array:', res);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
      for (let currentOffset = 0; currentOffset < totalNumberOfOffsets; currentOffset += limit) {
        const updatedValue = repLace.slice(0, index) + newValue + repLace.slice(index + newValue);
  
        const res = await getPostSearchIsdn.getPostSearchIsdn(updatedValue, currentOffset, limit);
        if (res.data && res.data.result && Array.isArray(res.data.result)) {
          results.push(...res.data.result);
        } else {
          console.error('Invalid response format or result is not an array:', res);
        }
      }
      // if(results?.length === 0) {
        // Alert.alert("Дугаар олдсонгүй")
      // } else {
        setLoadNumberList(results);
        setTotalPages(Math.ceil(results.length / limit));
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    paginationNumberList()
  }, [currentPage])

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
          ]}>
          <Text style={{ color: 'white' }}>{i}</Text>
        </TouchableOpacity>,
      );
    }
  
    return buttons;
  };

  useEffect(() => {
    setDefault(params.prodOpt?.prodOptId);
    // getNumberList();
    getCity();
    getDataPacks();
    getTalkPacks();
    getPacks();
    getHybPacks();
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
        console.log("IMSI error::::::::::", error)
        setInfo({ desc: "Сим картны мэдээлэл авахад алдаа гарлаа." });
      });

  }, []);

  useEffect(() => {
    contractApi.postContract().then((res) => {
      if (res.status == '200') {
        setContract(res.data)
      }
    })
  }, [])

  const setImsi = (data) => {
    setUserData("imsi")(data)
  }

  const handlePress1 = () => {
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
    getPostField({ number: phone }).then((response) => {
      if (response.info === "Success") {
        for (let i = 0; i < response.document.fields.length; i++) {
          if (response.document.fields[i].id == "5505") {
            console.log("simTypes ruu orson", response.document.fields[i].attributes)
            // setSimTypes(response.document.fields[i].attributes)
          }
        }
      }
    })

  }

  const handleCivilDownload = async () => {
    await civilId.getCivildId(register).then((res) => {
      setIsCivilId(res.data.civilid); 
      setUserData("isCivilId")(res.data.civilid)
    })
    toggleVisibility()
  }

  const handlePress2 = async () => {
    let isAdult = false;
    let isLimited = true;

    await numberLimit.numberLimit(register).then((res) => {
      isAdult = res?.data?.adult;
      isLimited = res?.data?.isLimited;
    })

    if (isAdult == false) {
      Alert.alert("Насанд хүрээгүй хэрэглэгчид дараа төлбөрт дугаар үүсгэх боломжгүй");
    }
    if (isLimited == true) {
      Alert.alert("Дугаарын хязгаарлалт хэтэрсэн байна");
    }
    if (userData.isForeigner == true) {
      Alert.alert("Гадаад хэрэглэгчид дараа төлбөрт дугаар үүсгэх боломжгүй");
    }

    if (!userData.imsi) {
      Alert.alert("IMSI -ний дугаар аа сонгоно уу");
    }

    if (isAdult == true && userData.isForeigner == false && isLimited == false && userData?.imsi) {
      getDataPacks()
      getTalkPacks()
      getPacks()
      getHybPacks()
      setStatus(3)
    }
  };

  const handlePress3 = () => {

    navigation.navigate("UserInfo", params)

  };

  const onSelectImsi = (item) => {
    setUserData("imsi")(item)
    setData(item);
  }

  const handleCancel = () => {
    navigation.navigate("Home", { screen: "Product" });
  };

  return (
    <AppContent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled keyboardVerticalOffset={0}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          {/* <AppLoader visible={loading || numberLoading} /> */}

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
          <View style={[{ height: 50 }]}>
            <View style={[Styles.row, { justifyContent: "space-between" }]}>
              <View style={[{ width: width / 5 }]}>
                <Text
                  style={[Styles.text10, { color: Constants.COLOR_CODE.red, textAlign: 'center' }]}
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
                      textAlign: 'center'
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
                      textAlign: 'center'
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
                      textAlign: 'center'
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
                source={
                  homeIcons[status > 3 ? "dotRed" : "dotGray"]
                }
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
                source={
                  homeIcons[status == 4 ? "dotRed" : "dotGray"]
                }
              />
            </View>
          </View>
          {info && <AppText style={Styles.textRed}>{info.desc}</AppText>}
          {status === 2 && (
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
              {searchData.length > 0 ? (<View style={{ flexDirection: "row", marginTop: 6 }}>
                <View style={{ width: "80%" }}>
                  <AppPicker
                    items={searchData}
                    placeholder="сонгох"
                    selectedItem={data}
                    onSelectItem={(item) => {
                      onSelectImsi(item)
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
              </View>) : (<Text style={styles.warningMessage}>Уучлаарай, IMSI дууссан байна!</Text>)}
              <ContactRelationPicker
                label="Симний төрөл"
                items={simTypes}
                placeholder="сонгох"
                selectedItem={simType}
                onSelectItem={(item) => {
                  setSimType(item);
                  setUserData("sim")(item);
                }}
              />
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
                  />
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

              <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'column', height: 300 }}>   
              { loading ? <ActivityIndicator size="large" color="rgba(101,129,175,1)" /> : <>
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
                      setUserData("phone")(item.number)
                    }}>
                    <View
                      style={[
                        Styles.borderRadius12,
                        Styles.borderPurple,
                        styles.numberBox,
                      ]}>
                      <Text
                        style={{
                          color: Constants.COLOR_CODE.black24,
                          textAlign: 'center',
                        }}>
                        {item.number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                {renderPaginationButtons()}
              </View>
            </> }
            </View>
              <AppButton
                onPress={handlePress1}
                title="Үргэлжлүүлэх"
                disabled={!phone} //  || !data || !data.label
              />
            </>
          )}

          {status === 2 && (
            <>
              {info1 && <AppText style={Styles.textRed}>{info1}</AppText>}
              <AppPicker
                label="Улс"
                items={countryList}
                placeholder="сонгох"
                selectedItem={country}
                onSelectItem={(item) => {
                  setCountry(item);
                  setUserData("isForeigner")(item.value);
                }}
              />
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View
                  style={{
                    width: "100%",
                    paddingLeft: 0,
                    paddingRight: 10,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <AppTextInput
                    onChangeText={(register) => { setRegister(register); setUserData("register")(register); }}
                    label="Регистрийн дугаар"
                    value={register}
                    autoFocus
                  />
                  <AppButton
                    onPress={handleCivilDownload}
                    title="Иргэний бүртгэлийн дугаар татах"
                  />
                  {!isVisible && <>
                    <AppTextInput
                      onChangeText={(e) => { setIsCivilId(e); setUserData("isCivilId")(isCivilId); }}
                      label="Иргэний бүртгэлийн дугаар"
                      value={isCivilId}
                      autoFocus
                    />
                  </>
                  }
                </View>
              </View>
              <AppButton
                onPress={handlePress2}
                title="Үргэлжлүүлэх"
                disabled={!country || !register || !userData.sim || !userData.prodOptId || !data
                }
              />
            </>
          )}

          {status === 3 && (<>
            <BagtsPicker
              label="Багц"
              items={params?.prodOpt?.prodOptId == 837 ? hybridPlans : bagtsnuud}
              placeholder="сонгох"
              selectedItem={bagts}
              onSelectItem={(item) => {
                setBagts(item);
                setUserData("package")(item.value)
              }}
            >
            </BagtsPicker>
            {userData.package && params?.prodOpt?.prodOptId == 657 ? <>
              <PackagePicker
                label="Дата"
                items={dataPacks}
                placeholder="сонгох"
                selectedItem={dataPack}
                onSelectItem={(item) => {
                  setDataPack(item);
                  setUserData("dataPackId")(item.id)
                }}
              />
              <PackagePicker
                label="Яриа"
                items={talkPacks}
                placeholder="сонгох"
                selectedItem={talkPack}
                onSelectItem={(item) => {
                  setTalkPack(item);
                  setUserData("talkPackId")(item.id)
                }}
              />
              <PackagePicker
                label="Хэрэглээнийн түвшин хязгаарлах"
                items={usageLimit}
                placeholder="сонгох"
                selectedItem={creditPack}
                onSelectItem={(item) => {
                  setCreditPack(item);
                  setUserData("creditPackId")(item.id)
                }}
              />
              <PackagePicker
                label="Шинэ дугаарын барьцаа"
                items={salesPacks}
                placeholder="сонгох"
                selectedItem={salesPack}
                onSelectItem={(item) => {
                  setSalesPack(item);
                  setUserData("salesPackId")(item.id)
                }}
              />
            </> : <></>}
            <AppButton
              onPress={handlePress3}
              title="Үргэлжлүүлэх"
              disabled={
                hybridPlans.find(item => item.value == bagts?.value) ? false :
                  !dataPack ||
                  !talkPack
              }
            />

          </>)}


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
                  datas.filter((f) => f.label.indexOf(searchImsi) > -1).length ===
                  1
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
    backgroundColor: 'rgba(101,129,175,1)',
    borderRadius: 5,
  },
  activePaginationButton: {
    backgroundColor: 'red',
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
    backgroundColor: 'white',
    color: "red",
    padding: 10,
    borderRadius: 10,
  }
});

export default GsmPostnumberScreen;