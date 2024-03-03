import React, { useState } from "react";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import product from "../../api/product";
import customer from "../../api/customerRegister";
import sell from "../../api/sell";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import AppButton1 from "../../components/AppButton1";
import AppText from "../../components/AppText";
import {
  Text,
  ScrollView,
  View,
  Alert,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Styles from "../../resources/Styles";
import { useEffect } from "react";
import AppPicker from "../../components/AppPicker";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import upload from "../../api/upload";
import AppModal from "../../components/AppModal";
import { searchIcons } from "../../assets/Images";
import dsignApi from "../../api/dsign";
import useUserInfo from "../../hooks/useUserInfo";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const { width } = Dimensions.get("window");

function GsmSimScreen({ parentState, route: { params } }) {
  const foreignerList = [
    { value: 0, label: "Монгол", foreigner: false },
    { value: 1, label: "Гадаад", foreigner: true },
  ];

  const navigation = useNavigation();
  const [info, setInfo] = useState();
  const [info1, setInfo1] = useState();
  const [phone, setPhone] = useState();
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  const [isLoadUser, setIsLoadUser] = useState(false);
  const { request: getInventories, loading } = useApi(product.getInventories);
  const { request: getCustomerInfo, loading: custLoading } = useApi(
    customer.getCustomerRegister
  );
  const { request: getAmsInfo, loading: amsLoading } = useApi(
    customer.getAmsUser
  );
  const { request: getPreview, loading: prewLoading } = useApi(sell.preview);
  const [lname, setLname] = useState();
  const [fname, setFname] = useState();
  const [register, setRegister] = useState();
  const [prodOptId, setProdOptId] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [foreigner, setforeigner] = useState();
  const { userData, setUserData } = useUserInfo();
  const [current, setCurrent] = useState(false);
  const [confirmIsdn, setConfirmIsdn] = useState("");
  const [isEditable, setIsEditable] = useState();

  const {
    request: uploadData,
    data: uploadResult,
    loading: uploadLoading,
  } = useApi(upload.uploadFile);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchImsi, setSearchImsi] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [hasMez, setHasMez] = useState();

  const handleContractPress = () => {
    navToContract({
      lname: lname,
      fname: fname,
      register: register,
      hasMez: hasMez,
      foreigner: foreigner.foreigner,
    });
  };

  const navToContract = (route) => {
    navigation.navigate("SimMez", { params: route });
  };

  const dsign = () => {
    if (current == true) {
      Alert.alert("Тоон гарын үсэг нэхэмжилсэн");
      dsignApi
        .dsign({ isdn: confirmIsdn, register: userData.register })
        .then((res) => {
          console.log("res========", res);
          if (res.data.code == "0") {
            Alert.alert("Тоон гарын үсэг амжилттай баталгаажлаа");
            setIsEditable(false);
            const xyp = res.data.xypinfo.passport;
            // setDsignData("xyp")(res.data.xypinfo.passport);
            setUserData("xyp")(res.data.xypinfo.passport);
            setFname(xyp.firstname);
            setLname(xyp.lastname);
          } else if (res.data.code == "500" || res.data.code == "400") {
            Alert.alert("Гарын үсэг баталгаажсангүй");
          }
        });
    } else if (current == false) {
      setIsEditable(true);
    }
  };

  const setDefault = async () => {
    setProdOptId(params.prodOpt?.prodOptId || params.option?.prodOptId);
  };

  useEffect(() => {
    setDefault();
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
            tempData.push({
              value: m.invId.toString(),
              label: m.invUid.toString(),
            });
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

  const handlePress = () => {
    if (!data || !data.label) return Alert.alert("IMSI дугаараа сонгоно уу !");
    if (phone === undefined || phone === "")
      return Alert.alert("Сэргээх утасны дугаар оруулна уу !");

    getCustomerInfo(phone)
      .then((response) => {
        console.log("res========", response);
        if (response.code === 0) {
          if (response.register === 1) {
            setInfo(null);
            getAmsInfo(phone)
              .then((res) => {
                console.log("ams=========", res);
                setHasMez(res.mez);
                if (res.type !== "") {
                  setIsLoadUser(true);
                }
              })
              .catch((err) => {
                setInfo({
                  desc: res.info
                    ? res.info
                    : phone + " дугаартай хэрэглэгчийн мэдээлэл олдсонгүй.",
                });
              });
          } else {
            setInfo({
              desc: "Бүртгэл дутуу тул уг үйлчилгээг ашиглах боломжгүй. Бүртгэлийг шинэчлэнэ үү!",
            });
          }
        } else {
          setInfo({
            desc: phone + " дугаартай гэрээт борлуулагчийн мэдээлэл олдсонгүй.",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleContinue = async () => {
    if (lname === undefined || lname === "")
      return Alert.alert("Овог оруулна уу !");
    if (fname === undefined || fname === "")
      return Alert.alert("Нэрээ оруулна уу !");
    if (register === undefined || register === "")
      return Alert.alert("Регистрийн дугаар оруулна уу !");
    if (current == false && !image1)
      return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");
    if (current == false && !image2)
      return Alert.alert("Цахим үнэмлэхний зургаа оруулна уу !");

    let files = [];

    if (current == false) {
      await uploadData(image1).then((response) => {
        files.push(response.result);
      });
      await uploadData(image2).then((response2) => {
        files.push(response2.result);
      });
    }

    const val = {
      ...parentState,
      prodOptId,
      autoVat: true,
      buhel: "",
      email: "nomail@nomail.mn",
      passRead: false,
      skipBO: current,
      isdn: phone,
      lastname: lname,
      firstname: fname,
      register,
      invIds: [Number(data.value)],
      invUid: data.label,
      files,
      isForeigner: foreigner.value,
      contractpath: params?.params?.parameter2,
      get_mez: params?.params?.parameter1,
      gsignread: current,
    };

    getPreview(val)
      .then((res) => {
        if (res.code === 200) {
          setInfo1(null);
          navigation.navigate("SimInfo", {
            ...val,
            isdn: res.result.isdn,
            productPrice: res.result.payAmount,
            rateplan: res.result.rateplan,
            promoPrice: res.result.totalAmount,
            promoDesc: res.result.promoProduct?.promo?.promoName,
          });
        } else {
          setInfo1(
            res.info ? res.info : "Төлбөрийн мэдээлэл харуулах боломжгүй."
          );
        }
      })
      .catch((error) => {
        setInfo1("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };

  const handleCancel = () => {
    navigation.navigate("Home", { screen: "Product" });
  };

  const pickFromGallery = async () => {
    try {
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
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    }
  };

  const pickFromCamera = async () => {
    try {
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
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    }
  };

  const pickFromGallery2 = async () => {
    try {
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
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    }
  };

  const pickFromCamera2 = async () => {
    try {
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
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    }
  };

  return (
    <AppContent>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppLoader visible={loading || custLoading || amsLoading} />
        <Text
          style={[
            Styles.textDarkBlue,
            width > 700 ? Styles.text28 : Styles.text16,
            Styles.fontWeight400,
          ]}
        >
          Сим сэргээлт
        </Text>
        <Text></Text>
        {info && <AppText style={Styles.textRed}>{info.desc}</AppText>}
        <>
          <Text
            style={[
              Styles.textDarkBlue,
              width > 700 ? Styles.text20 : Styles.text12,
              Styles.fontWeight400,
              { marginTop: 20 },
            ]}
          >
            IMSI дугаар
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
        <AppTextInput
          icon="search"
          onChangeText={(phone) => setPhone(phone)}
          label="Сэргээх утасны дугаар"
          keyboardType="numeric"
          autoFocus
          value={phone}
          maxLength={8}
        />
        <AppTextInput
          onChangeText={(register) => {
            setRegister(register);
            setUserData("register")(register);
          }}
          label="Регистрийн дугаар"
          value={register}
        />
        <AppPicker
          label="Улс"
          items={foreignerList}
          selectedItem={foreigner}
          onSelectItem={(item) => {
            setforeigner(item);
          }}
        />
        {!isLoadUser && (
          <AppButton
            onPress={handlePress}
            title="Хайх"
            disabled={!phone || phone.length < 8 || !data || !data.label}
          />
        )}
        {isLoadUser && (
          <>
            <Text></Text>
            <Text
              style={[
                Styles.textDarkBlue,
                width > 700 ? Styles.text28 : Styles.text16,
                Styles.fontWeight400,
              ]}
            >
              Хэрэглэгчийн мэдээлэл
            </Text>
            <Text></Text>
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
              onChangeText={(e) => setLname(e)}
              label="Овог"
              autoFocus
              value={lname}
              required
            />
            <AppTextInput
              onChangeText={(e) => setFname(e)}
              label="Нэр"
              value={fname}
            />
            <Text></Text>
            {current == false ? (
              <>
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
              </>
            ) : (
              <></>
            )}
            {hasMez === "false" ? (
              <>
                <AppButton
                  onPress={handleContractPress}
                  title="Гэрээ байгуулах"
                />
              </>
            ) : (
              <></>
            )}
            <AppButton
              onPress={handleContinue}
              title="Үргэлжлүүлэх"
              disabled={!lname || !fname || !register}
            />
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
                <Text style={[Styles.textBlue2, Styles.mTB6]} key={index}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </AppModal>
      </ScrollView>
    </AppContent>
  );
}

export default GsmSimScreen;
