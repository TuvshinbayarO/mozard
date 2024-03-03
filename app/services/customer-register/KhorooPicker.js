import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Styles from "../../resources/Styles";
import AppText from "../../components/AppText";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppIcon from "../../components/AppIcon";
import Constants from "../../resources/Constants";
import AppPickerItem from "../../components/AppPickerItem";
import AppModal from "../../components/AppModal";

const { width } = Dimensions.get("window");

function KhorooPicker({
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
        <AppText style={[Styles.textDarkBlue, width > 700 ? Styles.text20 : Styles.text12, {marginTop:10, marginBottom:10}]}>{label}</AppText>
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
              {selectedItem ? selectedItem.khorooName : placeholder}
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={(item) => item.khorooId}
          renderItem={({ item }) => (
            <AppPickerItem
              label={item.khorooName}
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
export default KhorooPicker;
