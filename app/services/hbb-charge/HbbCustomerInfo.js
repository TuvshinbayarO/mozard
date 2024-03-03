import React from "react";
import { View, Dimensions } from "react-native";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";
import AppPicker from "../../components/AppPicker";
import { useState } from "react";
import useSale from "../../hooks/useSale";
import WithSale from "../hoc/withSale";

const { width } = Dimensions.get("window");

function HbbCustomerInfo(props) {
  const { params, setParams, delParams, resetParams } = useSale();
  const [serviceType, setServiceType] = useState();
  const [speedType, setSpeedType] = useState();
  const [month, setMonth] = useState();
  const serviceTypes = [
    {
      label: "Service 1",
      value: "1",
    },
    {
      label: "Service 2",
      value: "2",
    },
  ];
  const speedTypes = [
    {
      label: "10 Mb",
      value: "1",
    },
    {
      label: "20 Mb",
      value: "2",
    },
  ];
  const months = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "3",
      value: "2",
    },
    {
      label: "6",
      value: "3",
    },
  ];

  return (
    <>
      <View
        // style={[
        //   // Styles.container,
        //   Styles.mLR20,
        //   Styles.bgWhite,
        //   Styles.borderRadius12,
        //   Styles.p20,
        //   Styles.blueShadow
        // ]}
      >
        <View>
          <AppText
            style={[Styles.textBlue, width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight600]}
          >
            Гэрээний дугаар
          </AppText>
          <AppText style={[Styles.textBlue280, width > 700 ? Styles.text20 : Styles.text12]}>
            20202020
          </AppText>
        </View>
        <View style={[{ marginTop: 10 }]}>
          <AppText
            style={[Styles.textBlue, width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight600]}
          >
            Дуусах хугацаа
          </AppText>
          <AppText style={[Styles.textBlue280, width > 700 ? Styles.text20 : Styles.text12]}>
            2021.02.02
          </AppText>
        </View>
      </View>
      <View style={[Styles.mLR20]}>
        <AppPicker
          label="Үйлчилгээний төрөл"
          items={serviceTypes}
          placeholder="сонгох"
          selectedItem={serviceType}
          onSelectItem={(item) => {
            setServiceType(item);
            setParams("serviceType")(item.value);
          }}
        />
        <AppPicker
          label="Хурдаа сонгоно уу"
          items={speedTypes}
          placeholder="сонгох"
          selectedItem={speedType}
          onSelectItem={(item) => {
            setSpeedType(item);
            setParams("speed")(item.value);
          }}
        />
        <AppPicker
          label="Сараа сонгоно уу"
          items={months}
          placeholder="сонгох"
          selectedItem={month}
          onSelectItem={(item) => {
            setMonth(item);
            setParams("month")(item.value);
          }}
        />
      </View>
    </>
  );
}

export default WithSale(HbbCustomerInfo);
