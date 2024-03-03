import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import AppScreen from "../../components/AppScreen";
import AppTextError from "../../components/AppTextError";
import NotificationItem from "./component/NotificationItem";

function NotificationScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");

  const promoList = [
    {
      promoId: 77,
      promoStart: 1594872000000,
      promoEnd: 1609344000000,
      promoDesc:
        "Бүгдэд нээлттэй бэлэн зүйлсийг биш гагцхүү өөрт тохирсон, өвөрмөц, өөр хэнд ч байхгүй цор ганц зүйлсийг бүтээж, олж мэдэх нь Gen Z-н онцлог. Тэгвэл зөвхөн чамд л тохирсон цоо шинэ урамшууллыг Be,., чамд зориуллаа.Энэ бол Be Unlimited... Өөртөө зориулж, өөрийнхөө хэрэглээтэй уялдуулан хурд болон ашиглах хугацаагаа сонгоод цоо шинэ дата багцыг бүтээж, сонгосон хугацаандаа хязгааргүй дата ашиглах боломжийг гагцхүү Be,.,-гийн залууст олгож байна.",
      promoDescEn:
        "Шалгуур хангасан гэрээт борлуулагч агент данс цэнэглэхэд нэмэлт 1% олгох урамшуулал",
      promoName: "Be,., Unlimited",
      promoNameEn: "Agent gereet bolruulagch tsenegleh uramshuulal",
      createDate: 1562516576000,
      promoStatus: 1,
      promoSort: 2,
      promoFilterList: null,
      promoProductList: null,
      promoDealerList: null,
      promoNotifyList: null,
      promoPurchaseList: null,
      promoSaleList: null,
    },
    {
      promoId: 78,
      promoStart: 1594872000000,
      promoEnd: 1609344000000,
      promoDesc:
        "Шалгуур хангасан гэрээт борлуулагч агент данс цэнэглэхэд нэмэлт 1% олгох урамшуулал",
      promoDescEn:
        "Шалгуур хангасан гэрээт борлуулагч агент данс цэнэглэхэд нэмэлт 1% олгох урамшуулал",
      promoName: "Агент гэрээт борлуулагч цэнэглэх урамшуулал",
      promoNameEn: "Agent gereet bolruulagch tsenegleh uramshuulal",
      createDate: 1562516576000,
      promoStatus: 1,
      promoSort: 2,
      promoFilterList: null,
      promoProductList: null,
      promoDealerList: null,
      promoNotifyList: null,
      promoPurchaseList: null,
      promoSaleList: null,
    },
    {
      promoId: 79,
      promoStart: 1594872000000,
      promoEnd: 1609344000000,
      promoDesc:
        "Шалгуур хангасан гэрээт борлуулагч агент данс цэнэглэхэд нэмэлт 1% олгох урамшуулал",
      promoDescEn:
        "Шалгуур хангасан гэрээт борлуулагч агент данс цэнэглэхэд нэмэлт 1% олгох урамшуулал",
      promoName: "Сурагч, оюутан, багш нарын анхааралд",
      promoNameEn: "Agent gereet bolruulagch tsenegleh uramshuulal",
      createDate: 1562516576000,
      promoStatus: 1,
      promoSort: 2,
      promoFilterList: null,
      promoProductList: null,
      promoDealerList: null,
      promoNotifyList: null,
      promoPurchaseList: null,
      promoSaleList: null,
    },
  ];
  
  return (
    <AppScreen style={styles.container}>
      <View
        style={[
          {
            alignContent: "flex-start",
            borderColor: "gray",
            borderRadius: 10,
            width: width - 40,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
          },
        ]}
      >
        {promoList.length ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={promoList}
            keyExtractor={(item) => item.promoId.toString()}
            renderItem={({ item }) => <NotificationItem promo={item} />}
            contentContainerStyle={styles.wrapper}
          />
        ) : (
          <AppTextError>Мэдээлэл хоосон байна.</AppTextError>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationScreen;
