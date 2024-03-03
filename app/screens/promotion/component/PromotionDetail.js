import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    View
} from 'react-native'

import Styles from '../../../resources/Styles'
import moment from "moment";

export const PromotionDetail = (props) => {
    const { width, height } = Dimensions.get("window");
    let item = props.route ? props.route.params : '';

    return (
        <ScrollView style={[{ borderColor: "gray", borderRadius: 10, marginBottom: 15 }]} key={item.promoId} showsVerticalScrollIndicator={false}>
            <Text style={[
                width > 700 ? Styles.text30 : Styles.text18,
                Styles.fontWeight600,
                { marginTop: 20, color: "#24173D", marginLeft: 20 , lineHeight:27}
                ]}>
                {item.promoName}
            </Text>
            <Text style={[
                width > 700 ? Styles.text20 : Styles.text12,
                Styles.fontWeight400,
                Styles.textRed,
                { marginRight: 20, marginTop: 5, lineHeight: 21, textAlign: "right" }
                ]}>
                {moment(Date(item.promoStart)).format("YYYY.MM.DD")} {" -  "}
                {moment(Date(item.promoEnd)).format("YYYY.MM.DD")}
            </Text>
            <Text style={[
                width > 700 ? Styles.text26 : Styles.text14,
                Styles.fontWeight400,
                { color: "#24173D80", marginLeft: 20,marginTop:20,  marginBottom: 20,marginRight:20, lineHeight:21 }
                ]}>
                {item.promoDesc}
            </Text>
        </ScrollView>
    );
};

