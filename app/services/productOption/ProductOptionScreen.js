import React from "react";
import { FlatList } from "react-native";

import AppContent from "../../components/AppContent";
import MenuItem from "../product/ProductItem";
import useUtils from "../../hooks/useUtils";
import useSale from "../../hooks/useSale";
import { dataImages } from "../../assets/Images";
import AppTextError from "../../components/AppTextError";

function ProductOptionScreen({ navigation: { navigate }, route: { params } }) {
  const { transformToRoute, capitalizeString } = useUtils();
  const { setParams } = useSale();
  return (
    <AppContent>
      {params.productOptions.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={params.productOptions[0].commGroupId === 25 ? 1 : 2}
          data={params.productOptions}
          keyExtractor={(item) => item.prodOptId.toString()}
          renderItem={({ item }) => (
            <MenuItem
              name={item.prodOptName}
              type={item.commGroupId}
              onPress={() => {
                const route = transformToRoute(item);
                setParams("prodOptId")(item.prodOptId);
                console.log('item.prodOptId', item.prodOptId)
                navigate(route === "" ? "Inventory" : route, {
                  screen: route === "" ? "List" : route,
                  params: { prodOpt: item, title: (item.productName && item.productName.length > 15 ? item.productName.substring(0, 15) + "..." : item.productName) || (item.prodOptName && item.prodOptName.length > 15 ? item.prodOptName.substring(0, 15) + "..." : item.prodOptName) }
                });
              }}
              icon={dataImages[item.prodOptId]}
              prodOptId={item.prodOptId}
            />
          )}
        />
      ) : (
        <AppTextError>Мэдээлэл хоосон байна.</AppTextError>
      )}
    </AppContent>
  );
}
export default ProductOptionScreen;
