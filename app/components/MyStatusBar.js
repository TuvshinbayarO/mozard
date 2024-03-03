import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Platform
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

let Styles = require('../resources/Styles');
import Constants from '../resources/Constants'

export default class MyStatusBar extends Component {
    render() {
        return (
            <View style={[styles.statusBar, this.props.bg ? { backgroundColor: this.props.bg } : Styles.bgWhite]}>
                <StatusBar
                    // dark-content, light-content and default
                    barStyle={'light-content'}
                    //To hide statusBar
                    hidden={this.props.hidden}
                    backgroundColor={Constants.COLOR_CODE.white}
                />
            </View>
        );
    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? isIphoneX() ? 40 : 20 : 0;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

var styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    }
})
