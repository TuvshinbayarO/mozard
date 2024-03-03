import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

import { homeIcons } from '../../assets/Images'
import Styles from '../../resources/Styles'

export const PanelItem = (props) => {
    let item = props.item ? props.item.item : ''
    return (
        <TouchableOpacity
            style={[Styles.center, Styles.row, { marginLeft: 10, marginBottom:10 }]}
            onPress={() => props.onPress("<<bell>>")}>
            <View style={[Styles.column, {width:80, alignSelf:"center"}]}>
                <Text style={[Styles.text22, Styles.fontWeight700, { marginTop: 20, color: "#24173D", width:100}, Styles.center]}>{item.title}</Text>
                {/* <View style={[Styles.bgWhite, Styles.borderGray, Styles.borderRadius14, Styles.center, Styles.icon48]}> */}
                    <Image resizeMode={'contain'} style={[Styles.icon72]} source={homeIcons["redUnit"]} />
                {/* </View> */}
            </View>
            <View style={[{ marginLeft: 50,  width:220 }]}>
                <Text style={[Styles.text16, Styles.fontWeight400, { marginTop: 20, color: "#24173D" }]}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60
    }
})