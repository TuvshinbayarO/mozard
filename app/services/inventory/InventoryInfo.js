import React from "react";
import { View, Dimensions } from "react-native";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";
import WithSale from "../hoc/withSale";
import useUtils from "../../hooks/useUtils";

const { width } = Dimensions.get("window");

function InventoryInfo({ parentState, route }) {
  const { onlyNumberFormat } = useUtils();
  const invIds = route.params.invIds || [];
  const amount = route.params.amount;
  const name = route.params.name;

  parentState.prodOptId = route.params.prodOptId;
  parentState.invIds = route.params.invIds;

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
              {onlyNumberFormat(amount || '')}
            </AppText>
            <AppText style={[Styles.textBlue280, Styles.text10]}>
              Төлөх дүн
            </AppText>
          </View>
          <View style={[{ marginTop: 23 }]}>
            <AppText style={[Styles.textBlue280, Styles.text10]}>
              {name}
            </AppText>
            <AppText style={[Styles.textBlue2, Styles.text20]}>
              {invIds.length} ширхэг
            </AppText>
          </View>
        </View>
      </View>
    </>
  );
}

export default WithSale(InventoryInfo);
