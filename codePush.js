import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Styles from './app/resources/Styles';
import AppText from './app/components/AppText';

const CodePushLoading = ({ progress = '0%'}) => {

  return (
    <View>
      <View style={styles.container}>
        <Image
          resizeMode='cover'
          width={100}
          height={100}
          source={require("./app/assets/dealer_new_icon4.png")}
        />
        <ActivityIndicator color='#FF0000' size="large" />
        <Text style={{color: 'black', fontSize: 10}}>Downloading update</Text>
        <AppText label={`${progress}`} variant={'body4'} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    textAlign: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column'
  },
});

export default CodePushLoading;

