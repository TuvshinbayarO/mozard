import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import AppScreen from "../../components/AppScreen";
import AppTextError from "../../components/AppTextError";
import useApi from "../../hooks/useApi";
import PromotionItem from "./component/PromotionItem";
import promoApi from "../../api/promo";
import AppLoader from "../../components/AppLoader";

function PromotionScreen() {

  const { width } = Dimensions.get("window")
  const {
    request: loadPromos,
    error,
    data: { result },
    loading,
  } = useApi(promoApi.getPromos);

  const getPromos = async () => {
    await loadPromos();
  }

  useEffect(() => {
    getPromos();
  }, []);

  return (
    <AppScreen style={styles.container}>
      <View style={[{ borderColor: "gray", borderRadius: 10, width: width - 10, marginTop: 10, marginBottom: 10, marginLeft: 5 }]} >
        <AppLoader visible={loading} />
        {result && result.length ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={result}
            keyExtractor={(item) => item.promoId.toString()}
            renderItem={({ item }) => <PromotionItem promo={item} />}
            contentContainerStyle={styles.wrapper}
          />
        ) : (
            <AppTextError>Урамшуулал хоосон байна.</AppTextError>
          )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PromotionScreen;
