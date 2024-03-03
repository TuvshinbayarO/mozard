import React, { useState } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Linking,
  Alert,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../../resources/Styles";
import Constants from "../../resources/Constants";
import useAuth from "../../hooks/useAuth";
import AppTextInput from "../../components/AppTextInput";
import { paymentIcons } from "../../assets/Images";
import { StatusBar } from "expo-status-bar";
import walletUrl from "../../api/monpay";
import useApi from "../../hooks/useApi";
import { BankItem } from "./BankItem";
import ConstantAPI from "../../api/ConstantAPI";
import AppText from "../../components/AppText";

const { width } = Dimensions.get("window");

const bankList = [
  {
    bankCode: 'khanbank',
    link: '',
    name: 'Хаан банк',
    account: '5038 04 3999',
    accountName: 'Мобиком корпораци'
  },
  {
    bankCode: 'xacbank',
    link: '',
    name: 'Хас банк',
    account: '500 113 8666',
    accountName: 'Мобиком корпораци ХХК'
  },
  {
    bankCode: 'golomt',
    link: '',
    name: 'Голомт банк',
    account: '2020 001 509',
    accountName: 'Мобиком корпораци ХХК'
  },
  {
    bankCode: 'state',
    link: '',
    name: 'Төрийн банк',
    account: '1060 0002 6979',
    accountName: 'Мобиком'
  },
  {
    bankCode: 'tdb',
    link: '',
    name: 'Худалдаа хөгжлийн банк',
    account: '499 22 3583',
    accountName: 'Мобиком корпораци ХХК'
  }
];

function MonpayPaymentScreen() {
  const { user } = useAuth();
  const [amount, setAmount] = useState();
  const { request: getMonpayUrl, data: monpayData } = useApi(
    walletUrl.getMonpayWalletUrl
    );
  const [monpayError, setMonpayError] = useState();

  const getMonpayWalletLink = async () => {
    if (!amount || amount === 0)
      Alert.alert("Татан авалт хийх дүнгээ оруулна уу");
    else {
      const tmpData = {
        agentId: user.dealerId,
        amount,
        agentCode: user.dealerCode,
        candyId: ConstantAPI.BRANCH_ID,
        deeplink: ConstantAPI.DEEPLINK,
      }
      getMonpayUrl(tmpData).then((resp) => {
        if (resp && resp.redirectUri) {
          Linking.openURL(resp.redirectUri).catch((err) => console.error('monpay pay error', err));
          setAmount(null);
          setMonpayError(null);
        } else {
          setMonpayError("Алдаа гарлаа.");
        }
      }).catch(err => {
        setMonpayError("Алдаа гарлаа.");
      });
    }
  }
  
  return (
    <ScrollView style={[Styles.containerWhite]} showsVerticalScrollIndicator={false}>
      <StatusBar animated={true} style="light" />
      <LinearGradient
        colors={[Constants.COLOR_CODE.lightBlue, Constants.COLOR_CODE.white]}
        start={[0, 0]}
        end={[1, 1]}
        style={[Styles.container]}
      >
        <View style={[Styles.m20, Styles.column]}>
          <View>
            <Text
              style={[
                width > 700 ? Styles.text34 : Styles.text20,
                Styles.textDarkBlue80,
                Styles.fontWeight500,
                Styles.letterSpace05,
              ]}
            >
              Татан авалт{user.agentId}
            </Text>

          </View>

          <View style={[{marginTop: 20}]}>
            <Text style={[width > 700 ? Styles.text26 : Styles.text14]}>Qpay</Text>
            <View style={[Styles.m10 ]}>
              <AppTextInput
                value={amount} 
                onChangeText={(item) => setAmount(item)}
                keyboardType="numeric"
                autoFocus
                label="Татан авалт хийх дүн"
                style={[width > 700 ? Styles.text26 : Styles.text14]}
              />
              {monpayError && <AppText style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textRed]}>{monpayError}</AppText>}
              <TouchableOpacity onPress={getMonpayWalletLink}>
                <Image style={{height: width > 700 ? 220 : 88, width: (width - 70) / 3, borderRadius: 12, marginTop: 10}} source={paymentIcons.monpay} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[{marginTop: 20}]}>
            <Text style={[width > 700 ? Styles.text26 : Styles.text14]}>Шилжүүлэг</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={[{ marginTop: 5 }]}
              data={bankList}
              renderItem={ ({ item }) => <BankItem item={item}  />}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

      </LinearGradient>
    </ScrollView>
  );
}
export default MonpayPaymentScreen;
