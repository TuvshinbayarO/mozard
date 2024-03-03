import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { HomeHeader } from "./component/HomeHeader";
import { HomeServiceItem } from "./component/HomeServiceItem";
import { HomeTransactionItem } from "./component/HomeTransactionItem";
import Styles from "../../resources/Styles";
import Constants from "../../resources/Constants";
import useApi from "../../hooks/useApi";
import AppTextError from "../../components/AppTextError";
import useAuth from "../../hooks/useAuth";
import AppLoader from "../../components/AppLoader";
import accountInfo from "../../api/accountInfoHome";
import AppModal from "../../components/AppModal";
import AppText from "../../components/AppText";
import moment from "moment";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Switch } from "react-native-gesture-handler";
import useUtils from "../../hooks/useUtils";
import storage from "../../auth/storage";
import { homeIcons } from "../../assets/Images";
import pincodeApi from "../../api/pincode"
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const { onlyNumberFormat } = useUtils();
  const { request: loadAccountInfo, data: info, loading } = useApi(
    accountInfo.getAccountInfo
  );
  const [pinCodeModal, setPinCodeModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [debit, setDebit] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = async (value) => {
    if (value) {
      try {
        const resp = await loadAccountInfo();
        if (resp && resp.debit) {
          storage.put("debit", resp.debit.toString());
          setDebit(resp.debit.toString());
        } else {
          setDebit("0");
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    }
    setSwitchValue(value);
  };

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      loadInfos();  
      // Check if user.dealerRole is defined before accessing menuData
      if (user && user.dealerRole && user.dealerRole.menuData) {
        const menuData = JSON.parse(user.dealerRole.menuData);
        console.log('menuData===========', menuData);
        setTags(menuData.menus);
      }
    }
  }, [user]);

  useEffect(() => {
    checkPincode();
    // checkGsign()
  }, []);

  const getDebitInfo = async () => {
    setDebit(storage.get("debit"));
  };

  useEffect(() => {
    setSwitchValue(false);
    if (isFocused) {
      getDebitInfo();
    }
  }, [isFocused]);

  const loadInfos = async () => {
    try {
      const res = await accountInfo.getRecentTransition();
  
      if (res.data && res.data.code === 200) {
        setData(res.data.result);
      } else {
        console.warn("Unexpected response code:", res.data ? res.data.code : "undefined");
      }
    } catch (error) {
      console.error("Error loading infos:", error);
    }
  };
  

  const handlePreview = () => {
    setModalVisible(true);
  };

  const handlePincode = () => {
    navigation.navigate("RestorePincode", {
      title: "Гүйлгээний нууц үг үүсгэх",
    });
  };

  const handleOnPress = (item) =>
    navigation.navigate("Product", {
      tagId: item.tagId,
      title:
        item.menuName.length > 15
          ? item.menuName.substring(0, 15) + "..."
          : item.menuName,
    });

  const checkPincode = async () => {
    const username = await storage.get("username");
    pincodeApi.notNullPincode(username).then((res) => {
      if (res.data.code === 201) {
        // 201 bval nuuts ug uusguulne
        setPinCodeModal(true);
      }
    });
  };

  
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[Constants.COLOR_CODE.red, Constants.COLOR_CODE.blue]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <StatusBar animated={true} style={[Constants.COLOR_CODE.red]} />
        <HomeHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <AppLoader visible={loading} />
          <View style={[Styles.container]}>
            <View style={[Styles.container]}>
              <View style={([Styles.m20], { alignSelf: "center" })}>
                <TouchableOpacity
                  style={[Styles.row]}
                  onPress={() => handlePreview()}
                >
                  {switchValue && (
                    <Text
                      style={[
                        width > 700 ? Styles.text38 : Styles.text32,
                        Styles.textWhite,
                        Styles.fontWeight700,
                        Styles.letterSpace05,
                      ]}
                    >
                      {debit && onlyNumberFormat(debit)}
                    </Text>
                  )}
                  {!switchValue && (
                    <Text
                      style={[
                        width > 700 ? Styles.text38 : Styles.text32,
                        Styles.textWhite,
                        Styles.fontWeight700,
                        Styles.letterSpace05,
                        { alignItems: "center" },
                      ]}
                    >
                      ******
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={[{ flexDirection: "row" }]}>
                  <Text
                    style={[
                      width > 700 ? Styles.text24 : Styles.text12,
                      Styles.textWhite,
                      Styles.fontWeight500,
                      Styles.letterSpace05,
                      { alignSelf: "center" },
                    ]}
                  >
                    Дансны үлдэгдэл
                  </Text>

                  <Switch
                    style={[{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }]}
                    trackColor={{ false: "#FFFFFF", true: "#E81E25" }}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={switchValue}
                  ></Switch>
                </View>
              </View>

              <View>
                <View style={[{ marginTop: 20, marginBottom: 10 }]}>
                  <Text
                    style={[
                      Styles.mLR20,
                      width > 700 ? Styles.text28 : Styles.text16,
                      Styles.textWhite,
                      Styles.fontWeight600,
                      Styles.letterSpace05,
                    ]}
                  >
                    Үйлчилгээ
                  </Text>
                  {tags && tags.length > 0 ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled={true}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={2}
                      contentContainerStyle={{ alignItems: "flex-start" }}
                      style={[
                        Styles.m10,
                        {
                          marginTop: 16,
                          width: width,
                          height: isCollapsed
                            ? width > 700
                              ? 240
                              : height * 0.2159
                            : height - 340,
                        },
                      ]}
                      data={tags}
                      renderItem={({ item }) => (
                        <HomeServiceItem
                          item={item}
                          onPress={() => handleOnPress(item)}
                        />
                      )}
                    />
                  ) : null}
                </View>

                <View
                  style={[
                    Styles.bgWhite,
                    {
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      flex: 1,
                    },
                  ]}
                >
                  <View style={[Styles.m20]}>
                    <TouchableOpacity
                      onPress={() =>
                        isCollapsed ? setCollapsed(false) : setCollapsed(true)
                      }
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "70%" }}>
                          <Text
                            style={[
                              width > 700 ? Styles.text28 : Styles.text16,
                              Styles.textDarkBlue80,
                              Styles.fontWeight600,
                            ]}
                          >
                            Сүүлийн гүйлгээ
                          </Text>
                        </View>
                        {isCollapsed && (
                          <View style={{ width: "30%", alignItems: "flex-end" }}>
                            <Image
                              source={homeIcons.down}
                              style={{ width: 25, height: 15 }}
                            />
                          </View>
                        )}
                        {!isCollapsed && (
                          <View style={{ width: "30%", alignItems: "flex-end" }}>
                            <Image
                              source={homeIcons.up}
                              style={{ width: 25, height: 15 }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                    {data.length > 0 && isCollapsed && (
                      <FlatList
                        style={[
                          {
                            marginTop: 10,
                            width: width - 40,
                          },
                        ]}
                        data={data}
                        renderItem={(item) => <HomeTransactionItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    )}
                    {data.length === 0 && isCollapsed && (
                      <AppTextError
                        style={[width > 700 ? Styles.text26 : Styles.text14]}
                      >
                        Гүйлгээ олдсонгүй.
                      </AppTextError>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <AppModal
            icon="coins"
            isVisible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight600,
                Styles.letterSpace05,
                {
                  lineHeight: 20,
                  marginLeft: 38,
                  marginBottom: 20,
                  marginTop: 20,
                  lineHeight: width > 700 ? 30 : 17.07,
                },
              ]}
            >
              Дансны үлдэгдэл: {onlyNumberFormat(info.debit)}
            </AppText>

            <AppText
              style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.textBlue2,
                Styles.fontWeight400,
                Styles.letterSpace05,
                {
                  lineHeight: 20,
                  marginLeft: 38,
                  marginBottom: 20,
                  lineHeight: width > 700 ? 30 : 17.07,
                },
              ]}
            >
              Огноо: {moment.unix(info.createDate / 1000).format("YYYY.MM.DD")}
            </AppText>
          </AppModal>
          <AppModal
            type="pincode"
            title="Гүйлгээний нууц үг үүсгэнэ үү!"
            isVisible={pinCodeModal}
            successText="Үүсгэх"
            onDismiss={() => {
              setPinCodeModal(false);
            }}
            onSuccess={() => {
              setPinCodeModal(false);
              handlePincode()
            }}
          >
            <AppText>Гүйлгээний нууц үг нь үйлчилгээ үзүүлэхэд зайлшгүй шаардлагатай</AppText>
          </AppModal>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
export default HomeScreen;
