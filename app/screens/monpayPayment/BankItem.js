import React, { useState } from 'react';
import {
    Text,
    Image,
    Dimensions,
    View,
    Clipboard,
    Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { paymentIcons } from '../../assets/Images';
import Constants from '../../resources/Constants';
import Styles from '../../resources/Styles';

const { width } = Dimensions.get("window");

export const BankItem = ({item}) => {
    const [isShow, setIsShow] = useState(false);

    const copyAccount = () => {
        let tmp = '';
        tmp = item.account.replace(' ', '').replace(' ', '').replace(' ', '');
        Clipboard.setString(tmp);
        Alert.alert(`'${tmp}' тест хуулагдлаа`);
    }

    const copyAccountName = () => {
        Clipboard.setString(item.accountName);
        Alert.alert(`'${item.accountName}' тест хуулагдлаа`);
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsShow(!isShow)}
                style={[Styles.row, Styles.black38Border, { height: width > 700 ? 70 : 50, marginTop: 10, marginRight: 24, alignItems: 'center', borderRadius: 8, width: width - 50 }]}>
                {item.bankCode === 'khanbank' ? 
                <Image style={[{ width: width > 700 ? 50 : 36, height: width > 700 ? 50 : 36, marginLeft: 16 }]} source={paymentIcons.haan} />
                : item.bankCode === 'xacbank' ?
                <Image style={[{ width: width > 700 ? 50 : 36, height: width > 700 ? 50 : 36, marginLeft: 16 }]} source={paymentIcons.khas} />
                : item.bankCode === 'golomt' ?
                <Image style={[{ width: width > 700 ? 50 : 36, height: width > 700 ? 50 : 36, marginLeft: 16 }]} source={paymentIcons.golomt} />
                : item.bankCode === 'tdb' ?
                <Image style={[{ width: width > 700 ? 50 : 36, height: width > 700 ? 50 : 36, marginLeft: 16 }]} source={paymentIcons.tdb} />
                : item.bankCode === 'state' ?
                <Image style={[{ width: width > 700 ? 50 : 36, height: width > 700 ? 50 : 36, marginLeft: 16 }]} source={paymentIcons.state} />
                :
                <Text style={[width > 700 ? Styles.text26 : Styles.text14]}>{item.name}</Text>
                }
                <View style={[Styles.row, { flex: 1, alignItems: 'center', marginLeft: 13 }]}>
                    <Text style={[width > 700 ? Styles.text26 : Styles.text15, Styles.textMonPay, { marginLeft: 5 }]}>{item.name}</Text>
                </View>
                {!isShow && (
                    <Image style={[{ margin: 4 }, Styles.icon24]} source={paymentIcons.blue_arrow} />
                )}
                {isShow && (
                    <Image style={[{ margin: 4 }, Styles.icon24]} source={paymentIcons.blue_arrow_down} />
                )}
                
            </TouchableOpacity>
            {isShow && (
                <View style={[Styles.container, Styles.borderRadius12, Styles.black38Border], {width: width - 50}}>
                    <View style={{marginLeft: 20}}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{width: '70%', marginTop: 10}} >
                                <Text style={[width > 700 ? Styles.text20 : Styles.text11, {marginTop: 8}]}>Дансны дугаар</Text>
                                <Text style={[width > 700 ? Styles.text42 : Styles.text14, {marginTop: 5}]}>{item.account}</Text>
                            </View>
                            <View style={{width: '30%', marginTop: 17}}>
                                <TouchableOpacity onPress={copyAccount}>
                                    <Text style={[width > 700 ? Styles.text20 : Styles.text11, {marginTop: 10, color: Constants.COLOR_CODE.red}]}>Хуулах</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: '70%', marginTop: 10}} >
                                <Text style={[width > 700 ? Styles.text20 : Styles.text11, {marginTop: 8}]}>Дансны нэр</Text>
                                <Text style={[width > 700 ? Styles.text42 : Styles.text14, {marginTop: 5}]}>{item.accountName}</Text>

                            </View>
                            <View style={{width: '30%', marginTop: 17}}>
                                <TouchableOpacity onPress={copyAccountName}>
                                    <Text style={[width > 700 ? Styles.text20 : Styles.text11, {marginTop: 10, color: Constants.COLOR_CODE.red}]}>Хуулах</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: 20}}></View>
                    </View>
                </View>
            )}
        </>
    )
}
