import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import AppLoader from "../../components/AppLoader";
import AppTextInput from "../../components/AppTextInput";
import useApi from "../../hooks/useApi";
import WithSale from "../hoc/withSale";
import sell from "../../api/sell";
import provisionBill from "../../api/provisionBill";
import AppPreview from "../../components/AppPreview";
import AppText from "../../components/AppText";
import Styles from "../../resources/Styles";
import AppButton2 from "../../components/AppButton2";
import { Dimensions, Text } from "react-native";
const { width } = Dimensions.get("window");

function GsmBillScreen({ parentState, onChangeState, route: { params } }) {
  const [info, setInfo] = useState();
  const [preview, setPreview] = useState();
  const [postBill, setPostBill] = useState();
  const { request: getBill, loading } = useApi(sell.preview);
  const { request: getPostBill } = useApi(provisionBill.getPostBill);
  parentState.prodOptId = params.prodOpt?.prodOptId || params.option?.prodOptId;

  const handlePress = (requestedIsdn) => {
    setPreview(null);
    if (requestedIsdn === undefined || requestedIsdn === "")
      return Alert.alert("Цэнэглэх дугаараа оруулна уу!");

    const data = {
      ...parentState,
      autoVat: true,
      buhel: "",
      email: "nomail@nomail.mn",
      passRead: false,
      skipBO: true,
    };

    getBill(data)
      .then((response) => {
        console.log("response in getBill: ", response);
        if (response.code === 200) {
          setPreview({
            isdn: requestedIsdn,
            amount: response.result.payAmount,
          });
          onChangeState("amount")(response.result.payAmount);
          //console.log('payAmount', response.result.payAmount)
          setInfo(null);
        } else if (response.code === 400) {
          //Alert.alert(response.info);
          setInfo(response.info);
        } else {
          //Alert.alert("Цэнэглэх дугаараа оруулна уу!");
          setInfo(
            response.info
              ? response.info
              : "Төлбөрийн мэдээлэл харуулах боломжгүй."
          );
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });

    getPostBill(data)
      .then((response) => {
        console.log("getPostBill: ", response);
        if (response.code === 200) {
          setPostBill(response.info);
        } else {
          setInfo(
            response.info
              ? response.info
              : "Төлбөрийн мэдээлэл харуулах боломжгүй."
          );
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };

  const handlePress2 = (requestedIsdn) => {
    setPreview(null);
    if (requestedIsdn === undefined || requestedIsdn === "")
      return Alert.alert("Цэнэглэх дугаараа оруулна уу!");

    const data = {
      ...parentState,
      autoVat: true,
      buhel: "",
      email: "nomail@nomail.mn",
      passRead: false,
      skipBO: true,
    };

    getPostBill(data)
      .then((response) => {
        console.log("getPostBill: ", response);
        if (response.code === 200) {
          setPostBill(response.info);
        } else {
          setInfo(
            response.info
              ? response.info
              : "Төлбөрийн мэдээлэл харуулах боломжгүй."
          );
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй.");
      });
  };

  return (
    <>
      <AppLoader visible={loading} />
      {info && <AppText style={Styles.textRed}>{info}</AppText>}
      {preview && (
        <AppPreview
          postBill={postBill}
          postBillDescription="Төлбөрийн үлдэгдэл"
          amount={preview.amount}
          amountDescription="Төлбөрийн дүн"
          title={preview.isdn}
          titleDescription="Утасны дугаар"
        />
      )}
      <Text
        style={[
          Styles.textDarkBlue,
          width > 700 ? Styles.text20 : Styles.text12,
          Styles.fontWeight400,
          { marginTop: 20 },
        ]}
      >
        Төлбөр төлөх дугаар
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={[
            {
              width: "40%",
              padding: 0,
              paddingRight: 5,
              paddingTop: 0,
              paddingBottom: 0,
            },
          ]}
        >
          <AppTextInput
            // icon="search"
            onChangeText={onChangeState("isdn")}
            onPress={() => handlePress(parentState.isdn)}
            keyboardType="numeric"
            autoFocus
          />
        </View>
        <View
          style={[
            Styles.row,
            Styles.around,
            Styles.text10,
            { width: "60%", padding: 0, alignSelf: "center" },
          ]}
        >
          {/* //// */}
          <AppButton2
            title="Хайх"
            onPress={() => handlePress(parentState.isdn)}
          />
          <AppButton2
            title="Төлбөр илгээх"
            style={[Styles.bgBlue]}
            onPress={() => handlePress2(parentState.isdn)}
          />
        </View>
      </View>

      <AppTextInput
        onChangeText={onChangeState("amount")}
        label="Төлбөрийн дүнгээ оруулна уу"
        keyboardType="numeric"
      >
      </AppTextInput>
    </>
  );
}

export default WithSale(GsmBillScreen);
