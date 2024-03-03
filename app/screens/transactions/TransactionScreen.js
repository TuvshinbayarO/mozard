import React from "react";
import { FlatList} from "react-native";
import AppTextError from "../../components/AppTextError";
import AppContent from "../../components/AppContent";
import ProductItem from "../../services/product/ProductItem";
import {transactionIcons } from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";

function TransactionScreen() {
  const navigation = useNavigation();

  const transactionType = [
    { id: 1, code:"account",name: "Дансны хуулга", title: "Дансны хуулга" },
    { id: 2, code:"sales", name: "Борлуулалт", title: "Борлуулалтын түүх" },
    { id: 3, code:"purchase", name: "Татан авалт", title: "Татан авалтын түүх" },
  ];

  return (
<AppContent>
    {transactionType && transactionType.length ? (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={transactionType}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <ProductItem
              product={item}
              name={item.name}
              onPress={() => navigation.navigate("TransactionsList", {
                id: item.id, title: item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title
              })}
              icon={transactionIcons[item.code]}
            />
        )}
      />
    ) : (
        <AppTextError>Хоосон жагсаалт</AppTextError>
      )}
  </AppContent>
  );
}
export default TransactionScreen;
