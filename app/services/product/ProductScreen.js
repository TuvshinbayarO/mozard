import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import productApi from "../../api/product";
import MenuItem from "./ProductItem";
import AppTextError from "../../components/AppTextError";
import AppLoader from "../../components/AppLoader";
import AppContent from "../../components/AppContent";
import useUtils from "../../hooks/useUtils";
import useSale from "../../hooks/useSale";
import { tagIcons } from "../../assets/Images";

function ProductScreen({ navigation: { navigate } }) {
  const { params: routeParams } = useRoute();
  const { setParams } = useSale();
  const { transformToRoute, capitalizeString } = useUtils();
  const {
    request: loadProducts,
    data: { result: products },
    loading: loadingProducts,
  } = useApi(productApi.getProducts);
  const { request: loadProductOptions } = useApi(productApi.getProductOptions);

  const getProducts = async () => {
    await loadProducts({ tag: routeParams.tagId });
  };
  const handlePress = (product) => {
    loadProductOptions(product.productId)
      .then(({ result: productOptions }) => {
        if (productOptions.length === 0) return navigate("NoRoute");
        // && [34, 32, 7, 8, 43, 41, 272, 413, 419, 473, 30, 31, 49, 38, 407, 85, 39, 58, 371, 61, 64, 404, 103, 106, 109].includes(productOptions[0].productId)
        if (product.productId !== 413 && productOptions.length === 1) {
          if (product.productType === 1) {
            navigate("Inventory", {
              screen: "List",
              params: { option: productOptions[0], title: product.productName },
            });
          } else if (productOptions[0].hasOwnProperty("provOpt")) {
            const route = transformToRoute(productOptions[0]);
            setParams("prodOptId")(productOptions[0].prodOptId);
            navigate(route, {
              screen: route,
              params: { option: productOptions[0], title: product.productName },
            });
          } else {
            navigate("NoRoute");
          }
        } else {
          navigate("ProductOption", {
            productOptions,
            title: capitalizeString(
              product.productName.length > 15
                ? product.productName.substring(0, 15) + "..."
                : product.productName
            ),
          });
        }
      })
      .catch((error) => {
        navigate("NoRoute");
      });
  };

  useEffect(() => {
    console.log("==============params 6===============", routeParams)
    getProducts();
  }, [routeParams]);

  return (
    <AppContent>
      <AppLoader visible={loadingProducts} />
      {products && products.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => (
            <MenuItem
              name={item.productName}
              onPress={() => handlePress(item)}
              icon={tagIcons["tag" + routeParams.tagId]}
              prodOptId={item.prodOptId}
            />
          )}
        />
      ) : (
        <AppTextError>Бараа тохируулаагүй байна.</AppTextError>
      )}
    </AppContent>
  );
}

export default ProductScreen;
