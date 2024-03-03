import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import Styles from "../../resources/Styles";
import Constants from "../../resources/Constants";
import transactionApi from "../../api/transaction";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import accountInfo from "../../api/accountInfoHome";
import AppText from "../../components/AppText";
import { useNavigation } from "@react-navigation/native";
import { HomeHeader } from "../home/component/HomeHeader";
import useUtils from "../../hooks/useUtils";
import { homeIcons } from "../../assets/Images";
import { PanelPlanItem } from "./PanelPlanItem";
import AppTextError from "../../components/AppTextError";
import AppButton1 from "../../components/AppButton1"; /////
import { SafeAreaView } from "react-native-safe-area-context";
import { inlineStyles } from "react-native-svg";
import AppIcon from "../../components/AppIcon";
import ModalForm from "../../components/ModalForm";

const { width, height } = Dimensions.get("window");
const planList = [];

function PanelScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation();
  const { onlyNumberFormat } = useUtils();
  const [target, setTarget] = useState();

  const { user } = useAuth();
  const { request: loadAccountInfo, data: info } = useApi(
    accountInfo.getAccountInfo
  );

  const { request: loadSalesInfo, data: salesInfo } = useApi(
    accountInfo.getSalesInfo
  );

  const { request: loadPurchaseInfo, data: purchaseInfo } = useApi(
    accountInfo.getPurchaseInfo
  );

  const { request: loadTargetInfo, data: targetInfo } = useApi(
    accountInfo.getTargetInfo
  );

  const { request: loadTargetSubInfo, data: targetSubInfo } = useApi(
    accountInfo.getTargetSubInfo
  );

  const getAccountInfo = async () => {
    await loadAccountInfo();
  };

  const getSalesInfo = async () => {
    await loadSalesInfo();
  };

  const getPurchaseInfo = async () => {
    await loadPurchaseInfo();
  };

  const getTargetInfo = async () => {
    await loadTargetInfo();
  };

  const getTargetSubInfo = async (target) => {
    await loadTargetSubInfo(target);
  };

  useEffect(() => {
    getAccountInfo();
    getSalesInfo();
    getPurchaseInfo();
    getTargetInfo();
  }, []);

  const onPressDealer = (item) => {
    getTargetSubInfo(item.targetId);
    DealerItem(targetSubInfo);
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const DealerItem = (props) => {
    var item = props ? props : "";
    if (item) {
      return (
        <View>
          {item.props ? (
            <>
              <View
                style={[
                  Styles.bgWhite,
                  Styles.borderRadius12,
                  Styles.p20,
                  Styles.blueShadow,
                ]}
              >
                <View style={[Styles.row, Styles.around]}>
                  <Text style={[Styles.textBlue]}>Төлөвлөгөө</Text>
                  <Text style={[Styles.textBlue]}>Биелүүлсэн</Text>
                </View>
                <View style={[Styles.row, Styles.around]}>
                  {item.props[2] == 0 ? (
                    <>
                      <Text>{item.props[1]}ш</Text>
                      <Text>{item.props[0]}ш</Text>
                    </>
                  ) : (
                    <>
                      <Text>{item.props[1]}₮</Text>
                      <Text>{item.props[0]}₮</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  Styles.bgWhite,
                  Styles.borderRadius12,
                  Styles.p20,
                  Styles.blueShadow,
                  Styles.row,
                  Styles.between,
                ]}
              >
                <Text></Text>
              </View>
              <View
                style={[
                  Styles.bgWhite,
                  Styles.borderRadius12,
                  Styles.p20,
                  Styles.blueShadow,
                  Styles.row,
                  Styles.between,
                ]}
              >
                {item[2] == 0 ? (
                  <>
                    <Text>{item[0]}</Text>
                    <Text>{item[1]}ш</Text>
                    <Text>{item[2]}</Text>
                  </>
                ) : (
                  <>
                    <Text>{item[0]}</Text>
                    <Text>{item[1]}₮</Text>
                    <Text>{item[2]}</Text>
                  </>
                )}
              </View>
            </>
          )}
        </View>
      );
    } else {
      return (
        <AppTextError style={[width > 700 ? Styles.text26 : Styles.text14]}>
          Мэдээлэл ороогүй байна.
        </AppTextError>
      );
    }
  };

  const TargetItem = (props) => {
    var item = props ? props.props : "";
    return (
      <TouchableOpacity
        style={[
          Styles.p6,
          Styles.center,
          Styles.bgWhite,
          Styles.borderRadius12,
          Styles.p20,
          Styles.blueShadow,
          Styles.row,
          Styles.between,
          { marginRight: 27 },
        ]}
        onPress={() => onPressDealer(item)}
      >
        <Text style={[Styles.textBlue, { flex: 1, flexWrap: "wrap" }]}>
          {item.targetMonth}
        </Text>
        <Text style={{ flex: 1.2, flexWrap: "wrap" }}>{item.targetName}</Text>
        <View style={[Styles.row, Styles.between, { flex: 0.8 }]}>
          <Image
            resizeMode={"contain"}
            style={[
              width > 700 ? Styles.icon42 : Styles.icon32,
              { marginLeft: 5 },
            ]}
            source={homeIcons["blueUnion"]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    headerContainer: {
      height: 60,
    },
  });

  const renderTarget = ({ item }) => <TargetItem props={item} />;

  return (
    <View style={[Styles.containerWhite]}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={[Styles.centerJustify, Styles.p16, { minHeight: height }]}>
          {modalOpen && targetSubInfo ? (
            <DealerItem props={targetSubInfo} />
          ) : (
            <AppTextError style={[width > 700 ? Styles.text26 : Styles.text14]}>
              Мэдээлэл ороогүй байна.
            </AppTextError>
          )}

          <AppButton1
            title="буцах"
            onPress={modalClose}
            style={[
              Styles.borderRadius14,
              Styles.p16,
              Styles.center,
              Styles.bgRed,
            ]}
          />
        </View>
      </Modal>

      <StatusBar animated={true} style="light" />
      <LinearGradient
        colors={[Constants.COLOR_CODE.lightBlue, Constants.COLOR_CODE.white]}
        start={[0, 0]}
        end={[1, 1]}
        style={[Styles.container]}
      >
        <ScrollView
          style={[Styles.container]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[Styles.container]}>
            <View style={[Styles.m20]}>
              <TouchableOpacity
                style={[Styles.row]}
                onPress={() => handlePreview()}
              >
                <Text
                  style={[
                    width > 700 ? Styles.text34 : Styles.text20,
                    Styles.textDarkBlue80,
                    Styles.fontWeight500,
                    Styles.letterSpace05,
                  ]}
                >
                  Хэрэглэгчийн мэдээлэл
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                Styles.bgWhite,
                Styles.borderRadius12,
                Styles.p20,
                Styles.blueShadow,
                { marginLeft: 27, marginRight: 27 },
              ]}
            >
              <View style={[Styles.alignSecondaryEnd]}>
                <AppText
                  style={[
                    Styles.textRed,
                    width > 700 ? Styles.text34 : Styles.text20,
                    Styles.fontWeight600,
                  ]}
                >
                  {onlyNumberFormat(info.debit || "")}
                </AppText>
                <AppText
                  style={[
                    Styles.textBlue280,
                    width > 700 ? Styles.text20 : Styles.text10,
                  ]}
                >
                  Дансны үлдэгдэл
                </AppText>
              </View>
              <View>
                <AppText
                  style={[
                    Styles.textBlue280,
                    width > 700 ? Styles.text20 : Styles.text10,
                  ]}
                >
                  Агентийн дугаар
                </AppText>
                <AppText
                  style={[
                    Styles.textBlue2,
                    width > 700 ? Styles.text34 : Styles.text20,
                  ]}
                >
                  {user.dealerCode}
                </AppText>
              </View>
            </View>

            {purchaseInfo.result && (
              <>
                <View
                  style={[
                    Styles.borderRadius12,
                    Styles.p20,
                    Styles.blueShadow,
                    Styles.bgWhite,
                    { marginLeft: 27, marginRight: 27 },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textDarkBlue80,
                        Styles.fontWeight600,
                        Styles.letterSpace05,
                        { lineHeight: width > 700 ? 30 : 17.07 },
                      ]}
                    >
                      Сарын нийт татан авалт
                    </Text>
                  </View>
                  <View style={[{ flexDirection: "row" }]}>
                    <View
                      style={[
                        Styles.bgWhite,
                        Styles.borderRadius14,
                        Styles.center,
                        { width: "15%" },
                      ]}
                    >
                      <Image
                        resizeMode={"contain"}
                        style={[width > 700 ? Styles.icon84 : Styles.icon42]}
                        source={homeIcons["redUnit"]}
                      />
                    </View>
                    <View
                      style={[{ marginLeft: 12, marginTop: 10, width: "35%" }]}
                    >
                      <Text
                        style={[
                          width > 700 ? Styles.text20 : Styles.text13,
                          Styles.textDarkBlue80,
                          Styles.fontWeight400,
                          Styles.letterSpace05,
                        ]}
                      >
                        Дүнгээр
                      </Text>
                      <Text
                        style={[
                          width > 700 ? Styles.text20 : Styles.text13,
                          Styles.textDarkBlue80,
                          Styles.fontWeight400,
                          Styles.letterSpace05,
                        ]}
                      >
                        Тоогоор
                      </Text>
                    </View>
                    <View
                      style={[{ marginTop: 10, marginLeft: 12, width: "50%" }]}
                    >
                      <Text
                        style={[
                          width > 700 ? Styles.text26 : Styles.text14,
                          Styles.textDarkBlue80,
                          Styles.fontWeight600,
                          Styles.letterSpace05,
                          Styles.textGreen,
                          {
                            marginRight: 25,
                            lineHeight: width > 700 ? 30 : 17.07,
                            textAlign: "right",
                          },
                        ]}
                      >
                        {onlyNumberFormat(
                          purchaseInfo.result.purchaseAmount || ""
                        )}
                      </Text>
                      <Text
                        style={[
                          width > 700 ? Styles.text26 : Styles.text14,
                          Styles.textDarkBlue80,
                          Styles.fontWeight600,
                          Styles.letterSpace05,
                          {
                            marginRight: 25,
                            lineHeight: width > 700 ? 30 : 17.07,
                            textAlign: "right",
                          },
                        ]}
                      >
                        {purchaseInfo.result.purchaseCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
            {salesInfo.result && (
              <View
                style={[
                  Styles.bgWhite,
                  Styles.borderRadius12,
                  Styles.p20,
                  Styles.blueShadow,
                  { marginLeft: 27, marginRight: 27 },
                ]}
              >
                <View>
                  <Text
                    style={[
                      width > 700 ? Styles.text26 : Styles.text14,
                      Styles.textDarkBlue80,
                      Styles.fontWeight600,
                      Styles.letterSpace05,
                      { lineHeight: width > 700 ? 30 : 17.07 },
                    ]}
                  >
                    Сарын нийт борлуулалт
                  </Text>
                </View>
                <View style={[{ flexDirection: "row" }]}>
                  <View
                    style={[
                      Styles.bgWhite,
                      Styles.borderRadius14,
                      Styles.center,
                      { width: "15%" },
                    ]}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={[width > 700 ? Styles.icon84 : Styles.icon42]}
                      source={homeIcons["redUnit"]}
                    />
                  </View>
                  <View
                    style={[{ marginLeft: 12, marginTop: 10, width: "35%" }]}
                  >
                    <Text
                      style={[
                        width > 700 ? Styles.text20 : Styles.text13,
                        Styles.textDarkBlue80,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                      ]}
                    >
                      Дүнгээр
                    </Text>
                    <Text
                      style={[
                        width > 700 ? Styles.text20 : Styles.text13,
                        Styles.textDarkBlue80,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                      ]}
                    >
                      Хувь шимтгэл
                    </Text>
                    <Text
                      style={[
                        width > 700 ? Styles.text20 : Styles.text13,
                        Styles.textDarkBlue80,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                      ]}
                    >
                      Тоогоор
                    </Text>
                  </View>
                  <View
                    style={[{ marginTop: 10, marginLeft: 12, width: "50%" }]}
                  >
                    <Text
                      style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textDarkBlue80,
                        Styles.fontWeight600,
                        Styles.letterSpace05,
                        Styles.textGreen,
                        {
                          marginRight: 25,
                          lineHeight: width > 700 ? 30 : 17.07,
                          textAlign: "right",
                        },
                      ]}
                    >
                      {onlyNumberFormat(salesInfo.result.salesAmount || "")}
                    </Text>
                    <Text
                      style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textDarkBlue80,
                        Styles.fontWeight600,
                        Styles.letterSpace05,
                        Styles.textRed,
                        {
                          marginRight: 25,
                          lineHeight: width > 700 ? 30 : 17.07,
                          textAlign: "right",
                        },
                      ]}
                    >
                      {onlyNumberFormat(salesInfo.result.salesComm || "")}
                    </Text>
                    <Text
                      style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textDarkBlue80,
                        Styles.fontWeight600,
                        Styles.letterSpace05,
                        {
                          marginRight: 25,
                          lineHeight: width > 700 ? 30 : 17.07,
                          textAlign: "right",
                        },
                      ]}
                    >
                      {salesInfo.result.salesCount || ""}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View
              style={[
                {
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  flex: 1,
                },
              ]}
            >
              <View style={[{ marginLeft: 27, marginTop: 20 }]}>
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                  <Text
                    style={[
                      width > 700 ? Styles.text26 : Styles.text14,
                      Styles.textBlue2,
                      Styles.fontWeight500,
                      { lineHeight: width > 700 ? 28 : 14.63, width: "80%" },
                    ]}
                  >
                    БОРЛУУЛАЛТЫН ТӨЛӨВЛӨГӨӨ
                  </Text>
                  <Image
                    resizeMode={"contain"}
                    style={[
                      width > 700 ? Styles.icon42 : Styles.icon32,
                      { marginLeft: 5 },
                    ]}
                    source={homeIcons["blueUnion"]}
                  />
                </View>

                {targetInfo.result ? (
                  <>
                    <FlatList
                      data={targetInfo.result}
                      renderItem={renderTarget}
                      keyExtractor={(item) => item.targetId.toString()}
                    />
                  </>
                ) : (
                  <AppTextError
                    style={[width > 700 ? Styles.text26 : Styles.text14]}
                  >
                    Мэдээлэл ороогүй байна.
                  </AppTextError>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
export default PanelScreen;
