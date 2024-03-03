import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';

import { newsIcons } from '../../assets/Images';
import Styles from '../../resources/Styles';
import moment from "moment";
import HTMLView from "react-native-htmlview";

const { width, height } = Dimensions.get('window')

export const BonusDetail = (props) => {
    const bonus = props.route ? props.route.params : "";
    return (
        <ScrollView style={[{ marginLeft: 27, marginRight: 27, marginEnd: 20 }]} showsVerticalScrollIndicator={false}>
            <View style={[{ flexDirection: "row" }]}>
                <Image
                    style={[
                        Styles.icon64,
                        Styles.borderRadius12,
                        { width: width - 50, height: 280 } ]}
                    source={newsIcons[`${bonus.bonus.code}`]}
                />
            </View>
            <View style={[{ flexDirection: "row" }]}>
                <Text
                    style={[
                        width > 700 ? Styles.text28 : Styles.text16,
                        Styles.textDarkBlue80,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                        {marginTop: 20}
                    ]}
                >
                    {bonus.bonus.title}
                </Text>
            </View>
            <View style={[{ flexDirection: "row", textAlign: "left" }]}>
                <Text
                    style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textRed,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                        {
                            marginRight: 25,
                            marginTop: 10
                        }
                    ]}>
                    {moment(Date(bonus.bonus.date)).format("YYYY.MM.DD")}
                </Text>
            </View>
            <View style={[{ flexDirection: "row" }]}>
                <Text
                    style={[
                        width > 700 ? Styles.text26 : Styles.text14,
                        Styles.textDarkBlue80,
                        Styles.fontWeight400,
                        Styles.letterSpace05,
                        {marginTop: 10}
                    ]}
                >
                    {bonus.bonus.subTitle}
                </Text>
            </View>
            <View style={[{ flexDirection: "row", marginTop: 10 }]}>
                <HTMLView textComponentProps={{ style: width > 700 ? Styles.text22 : Styles.text14 }}
                    value={bonus.bonus.desc} stylesheet={stylesHtml}
                />
            </View>
        </ScrollView> 
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60
    }
});

const stylesHtml = StyleSheet.create({
    span: {
      color: "#3498DB"
    },
    a: {
      color: "#E74C3C"
    },
    body: {
      lineHeight: 21,
      color: "#24173D80",
      textAlign: "justify"
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    title: {
      fontWeight: "500",
    },
    h4: {
      color: "#191970",
      fontSize: 16,
      fontWeight: "400",
    },
});