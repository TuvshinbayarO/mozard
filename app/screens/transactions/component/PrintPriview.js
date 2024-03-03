import React, { useState, useEffect } from "react";
import AppLoader from "../../../components/AppLoader";
import transactionApi from "../../../api/transaction";
import { Dimensions, Image, Text, View, ScrollView } from "react-native";
import useApi from "../../../hooks/useApi";
import AppScreen from "../../../components/AppScreen";
import Styles from "../../../resources/Styles";
import AppText from "../../../components/AppText";
import { homeIcons } from "../../../assets/Images";
import Constants from "../../../resources/Constants";
import QRCode from "react-native-qrcode-svg";
import useSale from "../../../hooks/useSale";
import storage from "../../../auth/storage";
import accountInfo from "../../../api/accountInfoHome";

const { width } = Dimensions.get("window");

export const PrintPriview = ({route: {params}}) => {
    const transactionId = params.id ? params.id : 0;
    const { request: loadPrintData, data: printings, loading} = useApi(transactionApi.getPrintPriview);
    const { request: loadAccountInfo, data: info } = useApi(
        accountInfo.getAccountInfo
      );
    const [data, setData] = useState();
    const { resetParams } = useSale();

    const getEBarimt = async () => {
        await loadPrintData(transactionId);
        setData(printings.request);
    }

    const updateDebit = async () => {
        loadAccountInfo().then((resp) => {
            storage.put("debit", resp.debit.toString());
        });
    }

    useEffect(() => {
        getEBarimt();
        updateDebit();
        resetParams();
    }, []);

    return (
        <AppScreen style={[Styles.containerWhite]}>
            <AppLoader visible={loading} />
            <ScrollView style={[Styles.column, { marginLeft: 5, marginRight: 5, marginTop: 15 }]} showsVerticalScrollIndicator={false}>
                <Text
                    style={[
                        width > 700 ? Styles.text30 : Styles.text18,
                        Styles.textDarkBlue80,
                        Styles.fontWeight500,
                        Styles.letterSpace05,
                        {textAlign: "center"}
                    ]}>
                    Төлбөрийн баримт
                </Text>
                <View style={[Styles.center]}>
                    <Image resizeMode={'contain'} style={[width > 700 ? Styles.icon96 : Styles.icon84]} source={homeIcons["ebarimt"]} />
                </View>
                {printings && printings.code !== 200 && <AppText style={[Styles.textRed, { marginTop: 5 }]}>{printings.info}</AppText>}
                {printings && printings.code === 200 && printings.result && (                    

                    <View>
                        <View style={[Styles.column, Styles.mLR24, { marginTop: 5 }]}>
                            <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>ТТД</Text>
                                <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).merchantId}</Text>
                            </View>

                            <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Огноо</Text>
                                <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).date}</Text>
                            </View>



                            {JSON.parse(printings.result.posapiRes).stocks && JSON.parse(printings.result.posapiRes).stocks.length > 0 && (
                                <>
                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Барааны код</Text>
                                        <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).stocks[0].barCode}</Text>
                                    </View>

                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68, { flex: 0.4 }]}>Барааны нэр</Text>
                                        <View style={[{ flex: 0.6, alignItems: 'flex-end' }]}>
                                            <Text numberOfLines={2} style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).stocks[0].name}</Text>
                                        </View>
                                    </View>

                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Тоо/шир</Text>
                                        <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>
                                            {JSON.parse(printings.result.posapiRes).stocks[0].qty} {JSON.parse(printings.result.posapiRes).stocks[0].measureUnit}
                                        </Text>
                                    </View>
                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn, { marginLeft: 74 }]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>НӨАТ-гүй үнэ</Text>
                                        <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{Number(JSON.parse(printings.result.posapiRes).stocks[0].unitPrice) - Number(JSON.parse(printings.result.posapiRes).stocks[0].vat)}₮</Text>
                                    </View>
                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn, { marginLeft: 74 }]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>НӨАТ</Text>
                                        <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).stocks[0].vat}₮</Text>
                                    </View>
                                    <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn, { marginLeft: 74 }]}>
                                        <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Нийт үнэ</Text>
                                        <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).stocks[0].totalAmount}₮</Text>
                                    </View>
                                </>
                            )}

                            {JSON.parse(printings.result.posapiRes).lottery !== '' && (
                                <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                    <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Cугалааны дугаар</Text>
                                    <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).lottery}</Text>
                                </View>
                            )}

                            <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>ДДТД</Text>
                                <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>{JSON.parse(printings.result.posapiRes).billId}</Text>
                            </View>
                            {JSON.parse(printings.result.posapiRes).customerNo && (
                                <View style={[Styles.center, Styles.row, Styles.borderBottom, Styles.containerColumn]}>
                                    <Text style={[width > 700 ? Styles.text26 : Styles.text14, Styles.textBlack68]}>Худалдан авагч</Text>
                                    <Text style={[width > 700 ? Styles.text20 : Styles.text12, Styles.textBlack87]}>ТТД {JSON.parse(printings.result.posapiRes).customerNo}</Text>
                                </View>
                            )}
                            <View style={[Styles.center, Styles.m16, Styles.p15, { marginBottom: 25 }]}>
                                <QRCode
                                    value={JSON.parse(printings.result.posapiRes).qrData}
                                    size={110}
                                    bgColor={Constants.COLOR_CODE.black38}
                                    fgColor={Constants.COLOR_CODE.white}
                                />
                            </View>

                        </View>
                    </View>
                )}

            </ScrollView>
        </AppScreen>
    );
};
