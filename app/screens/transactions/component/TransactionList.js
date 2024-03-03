import React, { useState, useEffect } from "react";
import transactionApi from "../../../api/report";
import useApi from "../../../hooks/useApi";
import { FlatList } from "react-native-gesture-handler";
import { TransactionItem } from "./TransactionItem";
import AppLoader from "../../../components/AppLoader";

export const TransactionList = (props) => {
  let item = props.route ? props.route.params.id : "";
  const [preview, setPreview] = useState();

  const {
    request: salesTxn,
    error,
    data: { result },
    loading,
  } = useApi(transactionApi.getSalesTxn);

  const { request: purchaseTxn, data: purchaseData } = useApi(
    transactionApi.getPurchaseTxn
  );
  const { request: accountTxn, data: accountData } = useApi(
    transactionApi.getAccountTxn
  );

  const getSalesTxn = async () => {
    await salesTxn({
      limit: 20,
      offset: 0,
    });
  };
  const getPurchaseTxn = async () => {
    await purchaseTxn({
      limit: 20,
      offset: 0,
    });
  };
  const getAccountTxn = async () => {
    await accountTxn({
      limit: 20,
      offset: 0,
    });
  };

  useEffect(() => {
    if (item === 2) {
      getSalesTxn();
    } else if (item === 1) {
      getPurchaseTxn();
    } else if (item === 3) {
      getAccountTxn();
    }
  }, []);
  
  return (
    <>
      <AppLoader visible={loading} />

      {result && result.length && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {
              marginTop: 10,
              backgroundColor: "white",
            },
          ]}
          data={result}
          renderItem={(item) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.txnId.toString()}
        />
      )}
      {accountData.result && accountData.result.length && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {
              marginTop: 10,
              backgroundColor: "white",
            },
          ]}
          data={accountData.result}
          renderItem={(item) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {purchaseData.result && purchaseData.result.length && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {
              marginTop: 10,
              backgroundColor: "white",
            },
          ]}
          data={purchaseData.result}
          renderItem={(item) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.purchaseId.toString()}
        />
      )}
    </>
  );
};
