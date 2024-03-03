import React from "react";
import { View, Dimensions } from "react-native";
import useUtils from "../hooks/useUtils";
import Styles from "../resources/Styles";
import AppText from "./AppText";

const { width } = Dimensions.get("window");

function AppPreview({
  postBill,
  postBillDescription,
  amount,
  amountDescription,
  title,
  titleDescription,
  promoPrice,
  promoDesc,
}) {
  const { onlyNumberFormat, numFromString } = useUtils();
  return (
    <View
      style={
        ({ height: 100 },
        [
          Styles.container,
          Styles.bgWhite,
          Styles.borderRadius12,
          Styles.p20,
          Styles.blueShadow,
        ])
      }
    >
      <View style={[Styles.between, Styles.row, Styles.mTB12]}>
        {/* <View style={[Styles.alignSecondaryStart]}> */}
        <View>
          <AppText
            style={[
              Styles.textRed,
              width > 700 ? Styles.text34 : Styles.text20,
              Styles.fontWeight600,
            ]}
          >
            {postBill ? onlyNumberFormat(numFromString(postBill)) : ""}
          </AppText>
          <AppText
            style={[
              Styles.textBlue280,
              width > 700 ? Styles.text20 : Styles.text10,
            ]}
          >
            {postBillDescription}
          </AppText>
        </View>

        {/* <View style={[Styles.alignSecondaryEnd]}> */}
        <View>
          <AppText
            style={[
              Styles.textRed,
              width > 700 ? Styles.text34 : Styles.text20,
              Styles.fontWeight600,
            ]}
          >
            {onlyNumberFormat(amount)}
          </AppText>
          <AppText
            style={[
              Styles.textBlue280,
              width > 700 ? Styles.text20 : Styles.text10,
            ]}
          >
            {amountDescription}
          </AppText>
        </View>
      </View>

      {promoPrice && promoPrice !== amount ? (
        <View style={[Styles.mTB12]}>
          <AppText
            style={[
              Styles.textBlue280,
              width > 700 ? Styles.text24 : Styles.text14,
            ]}
          >
            Урамшуулалт үнэ
          </AppText>
          <AppText
            style={[
              Styles.textGreen,
              width > 700 ? Styles.text34 : Styles.text20,
              Styles.fontWeight600,
            ]}
          >
            {onlyNumberFormat(promoPrice)}
          </AppText>
          <AppText
            style={[
              Styles.textBlue280,
              width > 700 ? Styles.text20 : Styles.text10,
            ]}
          >
            {promoDesc}
          </AppText>
        </View>
      ) : (
        <></>
      )}

      <View style={[Styles.between, Styles.row]}>
        <View>
          <AppText
            style={[
              Styles.textBlue280,
              width > 700 ? Styles.text20 : Styles.text10,
            ]}
          >
            {titleDescription}
          </AppText>
          <AppText
            style={[
              Styles.textBlue2,
              width > 700 ? Styles.text34 : Styles.text20,
            ]}
          >
            {title}
          </AppText>
        </View>

        <View>
          {amount < 1000 ? (
            <AppText style={[Styles.p15, Styles.text12]}>
              Шимтгэл авахгүйг анхаарна уу.
            </AppText>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
}

export default AppPreview;
