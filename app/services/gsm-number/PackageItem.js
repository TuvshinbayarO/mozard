import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Styles from "../../resources/Styles";
import { FlatList, ScrollView, TouchableHighlight } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

export const PackageItem = (props) => {
  const data = props.item ? props.item.item : "";

  const handleSelect = () => {
    props.onPressSelected(data.group_id);
  }

  return (
    <View>
      <ScrollView horizontal>
        <TouchableHighlight onPress={handleSelect}>
          <View
            style={[
              Styles.bgWhite,
              Styles.borderRadius12,
              Styles.p14,
              Styles.blueShadow,
              {
                borderRadius: 24,
                height: 190,
                width: 200,
                marginLeft: 16,
                color: "white",
              },
            ]}
          >
            <View>
              <Text
                style={[
                  Styles.fontWeight500,
                  Styles.textDarkBlue80,
                  width > 700 ? Styles.text34 : Styles.text20,
                  Styles.letterSpace05,
                  {
                    textAlign: "left",
                    marginTop: 10,
                    marginBottom: 10,
                  },
                ]}
              >
                {data.group_name}
              </Text>

              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data.infos}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <>
                    <Text
                      style={[
                        width > 700 ? Styles.text20 : Styles.text12,
                        Styles.fontWeight500,
                        Styles.textBlue2,
                        Styles.letterSpace05,
                      ]}
                    >
                      {item.description}
                    </Text>
                    <Text
                      style={[
                        width > 700 ? Styles.text20 : Styles.text12,
                        Styles.fontWeight500,
                        Styles.textBlue2,
                        Styles.letterSpace05,
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.line}></Text>
                  </>
                )}
              />
            </View>
          </View>

        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
  },
  line: {
    height: 1,
    marginLeft: 36,
    marginRight: 36,
    marginTop: 8,
    marginBottom: 8
  },
});
