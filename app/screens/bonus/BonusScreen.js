import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import AppTextError from "../../components/AppTextError";
import AppScreen from "../../components/AppScreen";
import Styles from "../../resources/Styles";
import { BonusItem } from "./BonusItems";

const { width } = Dimensions.get("window");

const bonusList = [
  {
    id: 123,
    date: 1609950296000,
    code: "medee1",
    title: "Гэрээсээ ухаалгаар",
    subTitle: "Урамшуулал 2021.04.12 - 05.09 дуустал үргэлжилнэ",
    desc: "<body><p>Цахим ертөнц дэх технологийн шийдлүүдийн тусламжтайгаар та бид хөл хорионы үеэр ч ажил, хичээл, сургалт, хурал уулзалтуудаа тасалдуулалгүй үргэлжлүүлж, байгаа газраасаа л бүхнийг зохицуулах боломжтой болсон. Харин энэ бүхнийг зохицуулахын тулд танд хурдтай, чанартай дата байхад л хангалттай.</p>" +
      "<p>Мобиком Корпорациас Нийгмийн хариуцлагын хүрээнд хэрэглэгчдэдээ зориулан хөл хорионы хугацаанд авах боломжтой тусгай дата багцуудыг худалдаанд гаргаж, тэдгээр багцыг сонгон ашигласан хэрэглэгчдэдээ нэмэлт БЭЛЭГТЭЙ урамшууллыг зарлалаа.</p>" +
      "<p>Мобиком Корпорациас Нийгмийн хариуцлагын хүрээнд хэрэглэгчдэдээ зориулан хөл хорионы хугацаанд авах боломжтой тусгай дата багцуудыг худалдаанд гаргаж, тэдгээр багцыг сонгон ашигласан хэрэглэгчдэдээ нэмэлт БЭЛЭГТЭЙ урамшууллыг зарлалаа.</p>" +
      "<p>Мобиком Корпорациас Нийгмийн хариуцлагын хүрээнд хэрэглэгчдэдээ зориулан хөл хорионы хугацаанд авах боломжтой тусгай дата багцуудыг худалдаанд гаргаж, тэдгээр багцыг сонгон ашигласан хэрэглэгчдэдээ нэмэлт БЭЛЭГТЭЙ урамшууллыг зарлалаа.</p>" +
      "<p>Та Mobicom апликейшны ДАТА АВАХ цэс рүү ороод, шинээр нэмэгдсэн ГЭРЭЭСЭЭ УХААЛГААР дэд цэсний дараах гурван төрлийн онцгой дата багцаас өөрийн хэрэгцээ шаардлагад нийцүүлэн сонголтоо хийгээрэй. 1, 3 болон 7 хоногийн онцгой багцуудаас алийг нь ч сонгосон танд 30 хоног ашиглах Academy дата багцыг бэлэглэнэ.</p></body>"
  }
];

function BonusScreen() {
  return (
    <AppScreen style={[Styles.containerWhite]}>
      <Text
        style={[
          width > 700 ? Styles.text30 : Styles.text18,
          Styles.textDarkBlue80,
          Styles.fontWeight500,
          Styles.letterSpace05,
          { marginLeft: 27, marginRight: 27, marginTop: 15 }
        ]}>
          Урамшуулал
      </Text>
      <ScrollView style={[{ width: width - 40, marginTop: 10, marginBottom: 10, marginLeft: 10 }]} showsVerticalScrollIndicator={false} >
        {bonusList.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={bonusList}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => <BonusItem bonus={item} />}
          />
        ) : (
            <AppTextError style={[width > 700 ? Styles.text26: Styles.text14]}>Урамшуулал хоосон байна.</AppTextError>
          )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BonusScreen;
