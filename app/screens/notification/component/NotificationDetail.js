import React from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native'

import Styles from '../../../resources/Styles'

const { width } = Dimensions.get("window");

export const NotificationDetail = (props) => {
    let item = props.route ? props.route.params : '';

    return (
        <View style={[{ borderColor: "gray", borderRadius: 10, marginBottom: 15 }]} key={item.promoId}>
            <Text style={[width > 700 ? Styles.text30 : Styles.text18, Styles.fontWeight600, { marginTop: 20, color: "#24173D", marginLeft: 20 , lineHeight: width > 700 ? 35 : 27}]}>{item.promoName}</Text>
            <Text style={[width > 700 ? Styles.text28 : Styles.text14, Styles.fontWeight400, { color: "#24173D80", marginLeft: 20,marginTop:20,  marginBottom: 20,marginRight:20, lineHeight: width > 700 ? 35 : 21 }]}>{item.promoDesc}</Text>
        </View>
    );
};

