import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  Alert
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Constants from "expo-constants";

import AppButton from "../../components/AppButton";
import AppModal from "../../components/AppModal";
import AppPicker from "../../components/AppPicker";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import useSale from "../../hooks/useSale";
import AppContent from "../../components/AppContent";
import Styles from "../../resources/Styles";
import sellApi from "../../api/sell";
import useApi from "../../hooks/useApi";
import AppLoader from "../../components/AppLoader";
import { useNavigation } from "@react-navigation/native";
import useUtils from "../../hooks/useUtils";
import { FontAwesome5 } from "@expo/vector-icons";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalIcons } from "../../assets/Images";
import pincodeApi from "../../api/pincode";
import storage from "../../auth/storage";

const paymentTypes = [
  {
    label: "Бэлэн",
    value: 0,
  },
  // {
  //   label: "Monpay",
  //   value: 1,
  // },
];
const vats = [
  {
    label: "Хувь хүн",
    value: 0,
  },
  {
    label: "Байгууллага",
    value: 1,
  },
];

// type formData = {
//   error: String;
//   infoError: String;
//   hasError: Boolean;
//   modalVisible: Boolean;
//   warningModal: Boolean;
//   showRegister: Boolean;
// }

function WithSale(Component) {
  return function WidthSaleComponent({ ...otherProps }) {
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation();
    const { onlyNumberFormat } = useUtils();
    const headerHeight = useHeaderHeight();
    const [error, setError] = useState();
    const [infoError, setInfoError] = useState();
    const [hasError, setHasError] = useState(false);
    const [response, setResponse] = useState();
    const [vat, setVat] = useState();
    const [paymentType, setPaymentType] = useState();
    const [showRegister, setShowRegister] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { params, setParams, delParams, resetParams } = useSale();
    const { request: confirm, loading } = useApi(sellApi.confirm);

    const [warningModal, setWarningModal] = useState(false);
    const [pinCodeModal, setPinCodeModal] = useState(false);
    const { request: preview } = useApi(sellApi.preview);
    const [previewResult, setPreviewResult] = useState();

    // const [data, setData]  = useState<formData>({hasError: false, showRegister: false, modalVisible: false, warningModal: false});

    const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);
  // pincodeApi.checkPincode(param).then((res) => {

  // })
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

  const handleSubmit = async (e) => {
    if (value.length < 4) {
      Alert.alert("Гүйлгээний нууц үгээ гүйцэд оруулна уу");
    } else {
      const param = {
        pass: value,
        username: await storage.get("username")
      };

      pincodeApi.checkPincode(param).then((res) => {
        setValue("")
        if(res.status == 200) {
          handlePreview()
          
        } else if (res.status == 401) {
          Alert.alert("Гүйлгээний нууц үг буруу байна.")
          
        } else {
          Alert.alert("Уучлаарай алдаа гарлаа")
        }
      });

    }
  };


    
    useEffect(() => {
      setDefaults();
    }, []);

    const setDefaults = () => {
      setVat(vats[0]);
      setPaymentType(paymentTypes[0]);
      setParams("paymentType")(paymentTypes[0].value);
    };

    const handlePreview = () => {
      if (showRegister) {
        if (!params.customerNo) {
          setInfoError("Байгууллагын регистрийн дугаараа оруулна уу");
          return;
        } else {
          let reg = /^-*[0-9;]{7}$/;
          const reg1 = /(^[А-ЯЁӨҮ]{2}[0-9]{8}$)|(^\d{7}$)/;
          if (!params.customerNo.match(reg1)) {
            setInfoError("Байгууллагын регистрийн дугаар буруу байна");
            return;
          }
        }
      }
      confirm({ ...params, autoVat: true })
        .then((response) => {
          if (response && response.code) {
            if (response.code !== 200) {
              setError(response.info);
              setHasError(true);
              resetParams();
            } else {
              setResponse(response);
              setModalVisible(true);
              setInfoError(null);

              navigation.navigate("PrintPriview", {
                id: response.result.transaction.id || 0,
              });
            }
          } else {
            setError("Алдаа гарлаа");
            setHasError(true);
            resetParams();
          }
        })
        .catch((error) => {
          resetParams();
        });
    };

    const handleCancel = () => {
      resetParams();
      navigation.navigate("Home", { screen: "Product" });
    };

    const previewData = () => {
      preview({ ...params })
        .then((response) => {
          if (response && response.code) {
            if (response.code !== 200) {
              setError(response.info);
              setHasError(true);
              resetParams();
            } else {
              setPreviewResult({isdn: response.result.isdn, totalAmount: response.result.totalAmount || '0'});
              setWarningModal(true);
            }
          } else {
            setPinCodeModal(true);//
            setError("Алдаа гарлаа");
            setHasError(true);
            resetParams();
          }
        })
        .catch((error) => {
          setError("Алдаа гарлаа");
          setHasError(true);
          resetParams();
        });
    } 

    return (
      <AppContent>
        <KeyboardAvoidingView
          keyboardVerticalOffset={headerHeight + Constants.statusBarHeight}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={Styles.container}
        >
          <View
            style={[
              Styles.container,
              {
                justifyContent: "flex-end",
              },
            ]}
          >
            <AppLoader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Component
                parentState={params}
                onChangeState={setParams}
                {...otherProps}
              />
              <AppPicker
                label="Төлбөрийн хэлбэр"
                items={paymentTypes}
                placeholder="сонгох"
                selectedItem={paymentType}
                onSelectItem={(item) => {
                  setPaymentType(item);
                  setParams("paymentType")(item.value);
                }}
              />
              <AppPicker
                label="НӨАТ баримт"
                items={vats}
                placeholder="сонгох"
                selectedItem={vat}
                onSelectItem={(item) => {
                  if (item.value !== 1) {
                    delParams("customerNo");
                  }
                  setShowRegister(item.value === 1);
                  setVat(item);
                }}
              />
              {showRegister ? (
                <AppTextInput
                  keyboardType="numeric"
                  label="Байгууллагын регистрийн дугаар"
                  onChangeText={setParams("customerNo")}
                  value={params.customerNo}
                />
              ): <></>}
              {infoError ? (
                <AppText style={[Styles.textRed]}>{infoError}</AppText>
              ): <></>}
              <AppButton
                onPress={() => previewData()}
                title="Баталгаажуулах"
              />
              <AppButton
                title="Цуцлах"
                style={Styles.bgGray}
                onPress={handleCancel}
              />
              {response ? (
                <AppModal
                  type="success"
                  title="Амжилттай"
                  isVisible={modalVisible}
                  successText="дуусгах"
                  onDismiss={() => setModalVisible(false)}
                  onSuccess={() => {
                    setModalVisible(false);
                    delParams("isdn");
                    delParams("amount");
                    setValue("")
                  }}
                >
                  <AppText>{response.result.transaction.txnDesc}</AppText>
                </AppModal>
              ) : <></>}
              {error ? (
                <AppModal
                  type="warning"
                  title="Анхаар"
                  isVisible={hasError}
                  onDismiss={() => setHasError(false)}
                >
                  <AppText>{error}</AppText>
                </AppModal>
              ) : <></>}

              <AppModal
                type="warning"
                title="Санамж"
                isVisible={warningModal}
                successText="Баталгаажуулах"
                onDismiss={() => {
                  setWarningModal(false);
                }}
                onSuccess={() => {
                  setWarningModal(false);
                  setPinCodeModal(true);
                  // handlePreview();
                }}
              >
                <View style={[ Styles.mTB6 ]}>
                  <AppText style={[Styles.textBold]}>{`Та гүйлгээ хийхээсээ өмнө мэдээллээ дахин шалгана уу.`}</AppText>
                </View>
                {previewResult ? (
                  <>
                    {previewResult.isdn ? (
                      <View style={[ Styles.mTB6 ]}>
                        <AppText>Утасны дугаар: {previewResult.isdn}</AppText>
                      </View>
                    ): (<AppText></AppText>)}
                    {previewResult.totalAmount ? (
                      <View style={[ Styles.mTB6 ]}>
                        <AppText>Төлөх дүн: {onlyNumberFormat(previewResult.totalAmount.toString())}</AppText>
                      </View>
                    ) : (<AppText></AppText>)}
                  </>
                ) : (<AppText>Error</AppText>)}
              </AppModal> 

              { pinCodeModal ? <AppModal
                type="pincode"
                // title="Гүйлгээний нууц үг"
                isVisible={pinCodeModal}
                successText="Илгээх"
                onDismiss={() => {
                  setPinCodeModal(false);
                }}
                onSuccess={() => {
                  if(value.length < 4) {
                    Alert.alert("Гүйлгээний нууц үгээ бүрэн оруулна уу.")
                  } else {
                    setPinCodeModal(false);
                    handleSubmit()

                  }
                  
                  // handlePreview();
                }}
              >
                  <SafeAreaView>
                    <Text style={Styles.title}>Баталгаажуулалт </Text>
                     <Image style={[width > 700 ? Styles.icon64 : Styles.icon54, Styles.icon]} source={modalIcons.pincode} />
                    <Text style={Styles.subTitle}>
                      Гүйлгээний нууц үгээ оруулна уу
                    </Text>
                    <View style={Styles.fieldRow}>
                      <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                      />
                      <Text style={Styles.toggle} onPress={toggleMask}>
                        {enableMask ? <FontAwesome5
                        size={20}
                        name='eye-slash'
                        style={[Styles.textRed, Styles.mLR10]}
                      /> : <FontAwesome5
                      size={20}
                      name='eye'
                      style={[Styles.textRed, Styles.mLR10]}
                    />}
                      </Text>
                    </View>
                    
                  </SafeAreaView>
                  {/* <AppButton
                    // onPress={() => previewData()}
                    onPress={() => handlePreview()}
                    title="Гүйлгээ"
                  /> */}
              </AppModal> : <></>}
              
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </AppContent>
    );
  };
}

export default WithSale;

