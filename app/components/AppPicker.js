import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions
} from "react-native";
import AppText from "./AppText";
import AppPickerItem from "./AppPickerItem";
import AppModal from "./AppModal";
import AppSplitter from "./AppSplitter";
import Styles from "../resources/Styles";
import Constants from "../resources/Constants";
import AppIcon from "./AppIcon";

const { width } = Dimensions.get("window");

function AppPicker({
  label,
  icon,
  items,
  onSelectItem,
  placeholder,
  selectedItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View>
        {label && (
          <AppText style={[Styles.textDarkBlue, width > 700 ? Styles.text20 : Styles.text12, {marginTop:10, marginBottom:10}]}>{label}</AppText>
        )}
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View
            style={[
              Styles.center,
              Styles.borderRadius12,
              Styles.row,
              Styles.borderBlue2,
              Platform.OS == "ios" ? Styles.p16 : Styles.p14,
            ]}
          >
            {icon && (
              <AppIcon
                size={20}
                color={Constants.COLOR_CODE.blue2}
                name={icon}
                style={{ marginRight: 10 }}
              />
            )}
            <AppText
              style={[Styles.textBlue2, width > 700 ? Styles.text26 : Styles.text14, Styles.container]}
            >
              {selectedItem ? selectedItem.label : placeholder}
            </AppText>
            <AppIcon
              color={Constants.COLOR_CODE.blue2}
              name="chevron-right"
              size={14}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <AppModal
        title={label}
        isVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        dismissText="Буцах"
      >
        <FlatList
          style={{height: 350}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <AppSplitter />}
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <AppPickerItem
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </AppModal>
    </>
  );
}
export default AppPicker;
