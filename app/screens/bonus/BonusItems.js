import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import { newsIcons } from '../../assets/Images';
import { useNavigation } from "@react-navigation/native";
import Styles from '../../resources/Styles';
import moment from "moment";

const { width, height } = Dimensions.get('window')

export const BonusItem = ({bonus}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.spacer} 
            onPress={() => navigation.navigate("BonusDetail", {
                bonus
            })}
        >
            <Image style={[
                width > 700 ? Styles.icon96 :Styles.icon64,
                Styles.borderRadius12,
                { margin: 12, width: width - 50, height: width > 700 ? 300 : 140 }
                ]} source={newsIcons[`${bonus.code}`]}></Image>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60
    }
})