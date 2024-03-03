import React from "react";
import { View, Dimensions } from "react-native";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";
import { useState } from "react";
import AppTextInput from "../../components/AppTextInput";
import WithSale from "../hoc/withSale";
import AppPicker from "../../components/AppPicker";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

function DealerInfo({ parentState, onChangeState, route: { params } }) {
  // const data = params.response;
  const dealerPhone = params.dealerPhone;
  const dealerCode = params.dealerCode;
  const [code, setCode] = useState();
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    let data = [];
    params.response.map(m => {
      data.push({label: m.dealerCode, value: m.dealerId});
    })
    setCodes(data);
  }, []);

  return (
    <>
      <View>
        <View
          style={[
            Styles.container,
            Styles.bgWhite,
            Styles.borderRadius12,
            Styles.p20,
            Styles.blueShadow,
          ]}
        >
          <View style={[Styles.alignSecondaryEnd]}>
            <AppText
              style={[Styles.textRed, width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight600]}
            >
              {code && code.label}
            </AppText>
            <AppText style={[Styles.textBlue280, Styles.text10]}>
              Гэрээт борлуулагч
            </AppText>
          </View>
          <View style={[{ marginTop: 23 }]}>
            <AppText style={[Styles.textBlue280, Styles.text10]}>
              Гэрээт борлуулагчийн утасны дугаар
            </AppText>
            <AppText style={[Styles.textBlue2, Styles.text20]}>
              {dealerPhone}
            </AppText>
          </View>
        </View>
      </View>
      <View>
        <AppPicker
          label="Гэрээт борлуулагч код сонгох"
          items={codes}
          placeholder="сонгох"
          selectedItem={code}
          onSelectItem={(item) => {
            setCode(item);
            onChangeState("dealerId")(item.value);
          }}
        />
        <AppTextInput
          onChangeText={onChangeState("amount")}
          label="Цэнэглэх мөнгөн дүнгээ оруулна уу"
          keyboardType="numeric"
          value={parentState.amount}
        />
      </View>
    </>
  );
}

export default WithSale(DealerInfo);
