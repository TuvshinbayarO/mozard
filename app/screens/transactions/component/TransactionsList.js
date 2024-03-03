import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TransactionItem } from "./TransactionItem";
import AppLoader from "../../../components/AppLoader";
import transactionApi from "../../../api/report";
import productApi from "../../../api/product";
import { ActivityIndicator, View, Image, Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Styles from "../../../resources/Styles";
import AppText from "../../../components/AppText";
import moment from "moment";
import AppPicker from "../../../components/AppPicker";
import Constants from "../../../resources/Constants";
import AppTextInput from "../../../components/AppTextInput";
import useUtils from "../../../hooks/useUtils";

const { width } = Dimensions.get("window");

export const TransactionsList = (props) => {
    let type = props.route ? props.route.params.id : "";
    const isMounted = React.useRef(true);
    const { queryBuilder } = useUtils();
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maxPage, setMaxPage] = useState(1);
    const [startDate, setStartDate] = useState(null);

    const [product1, setProduct1] = useState();
    const [option1, setOption1] = useState();

    const [productList, setProductList] = useState([]);
    const [optionList, setOptionList] = useState([]);

    const [phone, setPhone] = useState();
    
    const loadLists = async () => {
        if (type === 1) {
            await getList1();
        } else if (type === 2) {
            await productApi.getProducts({}).then(res => {
                if (res.data) {
                    if (res.data.result) {
                        setProductList(res.data.result.map(({productId: value, productName: label}) => ({value, label})));
                    }
                }
            })
            await getList2();
        } else if (type === 3) {
            await transactionApi.getProductList().then(res => {
                if (res.data) {
                    if (res.data.result) {
                        setProductList(res.data.result.map(({productId: value, productName: label}) => ({value, label})));
                    }
                }
            });
            await getList3();
        }
    }

    useEffect(() => {
        loadLists();
    }, [product1, option1, startDate, phone]);

    const getList1 = async () => {
        if (page > maxPage) {
            return;
        }
        setLoading(true);
        await transactionApi.getAccountTxn({limit: 20, offset: page * 20}).then((resp) => {
            if (resp.data) {
                if (resp.data.code === 200) {
                    if (page === 0) {
                        setMaxPage(resp.data.total / 20);
                    }
                    setData([...data, ...resp.data.result]);
                    setPage(page + 1);
                } else {
                    console.log('get response error');
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const getList2 = async () => {
        setLoading(true);
        let searchParams = { limit: 20, offset: 0, sort: '-salesDate'};
        if (product1 !== undefined && product1.value) searchParams['productId'] = product1.value;
        if (option1 !== undefined && option1.value) searchParams['productOptId'] = option1.value;
        if (startDate !== null) searchParams['salesDate'] = startDate;
        if (phone !== undefined) searchParams['customerIsdn'] = phone;
        await transactionApi.getSalesTxn(queryBuilder(searchParams)).then((resp) => {
            if (resp.data) {
                if (resp.data.code === 200) {
                    if (resp.data.total > 20) {
                        setMaxPage(resp.data.total / 20);
                    } else {
                        setMaxPage(1);
                    }
                    setData(resp.data.result);
                    setPage(1);
                } else {
                    console.log('get response error');
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const getList2Page = async () => {
        if ((page + 1) > maxPage) {
            return;
        }
        setLoading(true);
        let searchParams = { limit: 20, offset: page * 20, sort: '-salesDate'};
        if (product1 !== undefined && product1.value) searchParams['productId'] = product1.value;
        if (option1 !== undefined && option1.value) searchParams['productOptId'] = option1.value;
        if (startDate !== null) searchParams['salesDate'] = startDate;
        if (phone !== undefined) searchParams['customerIsdn'] = phone;
        await transactionApi.getSalesTxn(searchParams).then((resp) => {
            if (resp.data) {
                if (resp.data.code === 200) {
                    if (page === 0) {
                        setMaxPage(resp.data.total / 20);
                    }
                    setData([...data, ...resp.data.result]);
                    setPage(page + 1);
                } else {
                    console.log('get response error');
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const getList3 = async () => {
        setLoading(true);
        let searchParams = { limit: 20, offset: 0, sort: '-purchaseDate'};
        if (product1 !== undefined && product1.value) searchParams['productId'] = product1.value;
        if (option1 !== undefined && option1.value) searchParams['productOptId'] = option1.value;
        if (startDate !== null) searchParams['purchaseDate'] = startDate;
        await transactionApi.getPurchaseTxn(queryBuilder(searchParams)).then((resp) => {
            if (resp.data) {
                if (resp.data.code === 200) {
                    if (resp.data.total > 20) {
                        setMaxPage(resp.data.total / 20);
                    } else {
                        setMaxPage(1);
                    }
                    setData(resp.data.result);
                    setPage(1);
                } else {
                    console.log('get response error');
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const getList3Page = async () => {
        if ((page + 1) > maxPage) {
            return;
        }
        setLoading(true);
        let searchParams = { limit: 20, offset: page * 20, sort: '-salesDate'};
        if (product1 !== undefined && product1.value) searchParams['productId'] = product1.value;
        if (option1 !== undefined && option1.value) searchParams['productOptId'] = option1.value;
        if (startDate !== null) searchParams['salesDate'] = startDate;
        await transactionApi.getPurchaseTxn(queryBuilder(searchParams)).then((resp) => {
            if (resp.data) {
                if (resp.data.code === 200) {
                    if (page === 0) {
                        setMaxPage(resp.data.total / 20);
                    }
                    setData([...data, ...resp.data.result]);
                    setPage(page + 1);
                } else {
                    console.log('get response error');
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleLoadMore = async () => {
        if (type === 1) {
            getList1();
        } else if (type === 2) {
            getList2Page();
        } else if (type === 3) {
            getList3Page();
        }
    }

    const onChangeOption = (productId) => {
        if (type === 2) {
            productApi.getProductOptions(productId).then(res => {
                if (res.data) {
                    if (res.data.result) {
                        setOptionList(res.data.result.map(({prodOptId: value, prodOptName: label}) => ({value, label})));
                        setOption1({value: res.data.result[0].prodOptId, label: res.data.result[0].prodOptName});
                    }
                }
            });
        } else {
            transactionApi.getOptionList(productId).then(res => {
                if (res.data) {
                    if (res.data.result) {
                        setOptionList(res.data.result.map(m => ({value: m.productOpt.prodOptId, label: m.productOpt.prodOptName})));
                        setOption1({value: res.data.result[0].productOpt.prodOptId, label: res.data.result[0].productOpt.prodOptName});
                    }
                }
            });
        }
    }

    const renderFooter = () => {
        if (page < maxPage) {
            return (
                <View>
                    <ActivityIndicator animating size="large" />
                </View>
            );
        } else {
            return <View></View>;
        }
    }

    const [isStartDateVisible, setStartDateVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDateVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDateVisibility(false);
    };

    const handleStartDateConfirm = (date) => {
        setStartDate(moment(date).format("YYYY-MM-DD"));
        hideStartDatePicker();
    };

    return (
        <View style={{backgroundColor: Constants.COLOR_CODE.white}}>
            <AppLoader visible={loading} />
            {type !== 1 && (
                <View style={{flexDirection: 'column', marginRight: 20, marginLeft: 20, marginTop: 20}}>
                    <AppPicker
                        label="Бараа үйлчилгээ"
                        items={productList}
                        placeholder="сонгох"
                        selectedItem={product1} 
                        onSelectItem={(item) => {
                            setProduct1(item);
                            onChangeOption(item.value);
                        }}
                    />
                    {optionList && (
                        <AppPicker
                            label="Үйлчилгээний сонголт"
                            items={optionList}
                            placeholder="сонгох"
                            selectedItem={option1} 
                            onSelectItem={(item) => {
                                setOption1(item);
                            }}
                        />
                    )}
                    <AppText></AppText>
                    <View style={[Styles.row]}>
                        <View style={{flex: type === 2 ? 0.5 : 1, paddingTop: 6}}>
                            <View
                                style={[
                                    Styles.p10,
                                    Styles.textDarkBlue,
                                    Styles.borderRadius12,
                                    Styles.borderBlue2,
                                    {height: 52}
                                ]}
                            >
                                <TouchableOpacity onPress={showStartDatePicker}>
                                    <AppText style={[Styles.textDarkBlue, width > 700 ? Styles.text20 : Styles.text12, Styles.fontWeight400]} placeholder="Огноо сонгох">Огноо</AppText>
                                    <AppText style={[Styles.textBlue280, width > 700 ? Styles.text20 : Styles.text12, Styles.fontWeight400]}>{startDate}</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {type === 2 && (
                            <View style={{flex: 0.5, paddingLeft: 10}}>
                                <AppTextInput
                                    name="isdn"
                                    onChangeText={phone => setPhone(phone)}
                                    keyboardType="numeric"
                                    placeholder="Утас"
                                    value={phone}
                                />
                            </View>
                        )}
                    </View>
                </View>
            )}
            <DateTimePickerModal
                isVisible={isStartDateVisible}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePicker}
            />
            {data.length > 0 && (
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[
                        {
                            marginTop: 10,
                            backgroundColor: "white",
                        },
                    ]}
                    data={data}
                    renderItem={(item) => <TransactionItem item={item} type={type} />}
                    keyExtractor={(item) => (item.txnId || item.id || item.purchaseId).toString()}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.5}
                />
            )}
        </View>
    );
};