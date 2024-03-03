import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppTextError from "../../components/AppTextError";
import AppToolbar from "../../components/AppToolbar";
import AppContent from "../../components/AppContent";
import { FlatList } from "react-native-gesture-handler";
import ProductItem from "../../services/product/ProductItem";
import { HelpDetail } from "./HelpDetail";
import { helpIcons } from "../../assets/Images";

const helpList = [
  {
    name: "Багц солих үйлчилгээний зааварчилгаа",
    description:
      "<body>" +
      "<h4>Дараа төлбөрт болон хосолсон төлбөрт үйлчилгээний багц солих заавар:</h4><br/>" +
      "<span><strong>1. ҮЙЛЧИЛГЭЭ ЦЭСНИЙ БАГЦ ҮЙЛЧИЛГЭЭ ГЭСЭН ЦЭРҮҮ ОРНО.</strong></span><br/>" +
      "<ul><li>УТ-ээс дараа төлбөртрүү багц ахиулах</li>" +
      "<li>Миний Мобигоос Миний Мобируу багц ахиулах</li>" +
      "<li>ХТ-өөс багц ахиулах гэсэн сонголтуудаас сонгоно.</li></ul><br/>" +
      "<span><strong>2. ХЭРЭГЛЭГЧИЙН ЦАХИМ ҮНЭМЛЭХИЙГ УНШУУЛНА.</strong></span><br/>" +
      "<ul><li>РД бичих талбарт РД бичх шаардлагагүй ба шууд цахим үнэмлэх уншуулна.</li></ul><br/>" +
      "<span><strong>3. ХЭРЭГЛЭГЧИЙН ХУРУУНЫ ХЭЭГ УНШУУЛНА.</strong></span><br/>" +
      "<ul><li>Хурууг байршуулан Хурууны хээ унших гэсэн товчлуур дээр дарна.</li></ul><br/>" +
      "<span><strong>4. ДУГААР ОРУУЛНА</strong></span><br/>" +
      "<ul><li>Дугаараа оруулаад үргэлжлүүлэх дарна.</li></ul><br/>" +
      "<span><strong>5. БАГЦАА СОНГОНО</strong></span><br/>" +
      "<ul><li>Hybrid  9900</li></ul><br/>" +
      "<ul><li>Hybrid 14900</li></ul><br/>" +
      "<ul><li>Миний Моби багц гэсэн 3 сонголт байна.</li></ul><br/>" +
      "<br/>Хэрэв Миний Моби багц гэсэн багцыг сонговол Ярианы эрх, Дата эрх гэсэн сонголтоос багцуудаа хослуулж сонгоход багцын нийт суурь хураамжийн дүн гарч ирнэ.<br/>" +
      "<br/><span><strong>7. ХЭРЭГЛЭГЧИЙН МЭДЭЭЛЭЛ БӨГЛӨХ ТАЛБАРЫГ БӨГЛӨНӨ.</strong></span><br/>" +
      "<ul><li>Байр, гудамж</li></ul><br/>" +
      "<ul><li>Хаалга тоот  хэсгийг бөглөөд үргэлжлүүлэх дарна.</li></ul><br/>" +
      "<ul><li>Билл хүлээн авах дугаар бөглөнө.</li></ul><br/>" +
      "<ul><li>Холбоо барих дугаар бөглөнө.</li></ul><br/>" +
      "<span><strong>9. ХХТ /Хэрэглээ хязгаарлах төвшин/ СОНГОНО.</strong></span><br/>" +
      "<ul><li>Хэрэв 14,800₮-ийн багц сонгосон бол 20,000₮ дүнг сонгоно.</li></ul><br/>" +
      "<ul><li>Хэрэв 14,800₮-өөс өндөр дүнтэй багц сонгосон бол 40,000₮ дүнг сонгоно.</li></ul><br/>" +
      "<br/><a><b>АНХААРАХ:</b></a><br/>" +
      "<a><b>!!!</b></a> Зөвхөн Цахим үнэмлэхтэй хэрэглэгч үйлчилгээ авах боломжтой.<br/>" +
      "<a><b>!!!</b></a> ДТ багцын суурь хураамж хамгийн ихдээ 39,800₮ дүнтэй байх боломжтой.<br/>" +
      "<a><b>!!!</b></a> Багцын суурь хураамжаас хамааруулж ХХТ-ийн дүнг зөв сонгоно уу.<br/>" +
      "<a><b>!!!</b></a> Агентаас багц ахиулахад барьцаа авахгүй ба хэрэглэгч салбарт ирж үйлчилгээ авах үед БАРЬЦАА БАЙРШУУЛААГҮЙ ТАЛААР АЛАРМ гарч ирнэ.<br/>" +
      "<a><b>!!!</b></a> Хэрэглэгчийн мэдээллийн бүрэн, үнэн зөв бөглөх шаардлагатайг анхаарна уу.<br/>" +
      "<a><b>!!!</b></a> Хэрэглэгчид гэрээний нөхцөлийг маш сайн танилцуулна уу.<br/>" +
      "<a><b>!!!</b></a> Хэрэглэгчийн сонгосон багцын сар бүрийн суурь хураамж багцын шинэ дүнгээр нэхэмжлэглэх талаар анхааруулна уу.<br/>" +
      "</body>",
    image: "forward",
  },
  {
    name: "Дараа төлбөр болон хосолсон төлбөрт шинэ дугаар үүсгэх заавар",
    description:
      "<body>" +
      "<h4>ДАРАА ТӨЛБӨРТ БОЛОН ХОСОЛСОН ТӨЛБӨРТ ШИНЭ ДУГААР ҮҮСГЭХ ЗААВАР:</h4><br/>" +
      "<span><strong>1. ШИНЭ ДУГААР/СИМ СЭРГЭЭЛТ ЦЭСРҮҮ ОРНО</strong></span><br/>" +
          "<ul><li>Дараа/хосолсон төлбөрт шинэ дугаар цэсийг сонгоно.</li></ul><br/>" +
      "<span><strong>2. СИМ КАРТАА УНШУУЛНА</strong></span><br/>" +
      "<span><strong>3. ХЭРЭГЛЭГЧИЙН ЦАХИМ ҮНЭМЛЭХИЙГ УНШУУЛНА.</strong></span><br/>" +
      "<span><strong>4. ХЭРЭГЛЭГЧИЙН ХУРУУНЫ ХЭЭГ УНШУУЛНА.</strong></span><br/>" +
          "<ul><li>Хурууг байршуулан Хурууны хээ унших гэсэн товчлуур дээр дарна.</li></ul><br/>" +
      "<span><strong>5. ДУГААР СОНГОНО</strong></span><br/>" +
          "<ul><li>Хайх хэсэгт дугаараа хайх боломжтой</li></ul><br/>" +
      "<span><strong>6. БАГЦАА СОНГОНО</strong></span><br/>" +
          "<ul><li>Hybrid  9900</li>" +
          "<li>Hybrid 14900</li>" +
          "<li>Миний Моби багц гэсэн 3 сонголт байна.</li></ul><br/>" +
      "<br/>Хэрэв Миний Моби багц гэсэн багцыг сонговол Ярианы эрх, Дата эрх гэсэн сонголтоос багцуудаа хослуулж сонгоход багцын нийт суурь хураамжийн дүн гарч ирнэ.<br/>" +
      "<br/><span><strong>7. ХЭРЭГЛЭГЧИЙН МЭДЭЭЛЭЛ БӨГЛӨХ ТАЛБАРЫГ БӨГЛӨНӨ.</strong></span><br/>" +
        "<ul><li>Байр, гудамж</li>" +
        "<li>Хаалга тоот  хэсгийг бөглөөд үргэлжлүүлэх дарна.</li>" +
        "<li>Билл хүлээн авах дугаар бөглөнө.</li>" +
        "<li>Холбоо барих дугаар бөглөнө.</li></ul><br/>" +
      "<span><strong>8. ДАРАА ТӨЛБӨРТ ДУГААРЫН ТОХИРОХ БАРЬЦАА СОНГОНО</strong></span><br/>" +
      "<ul><li>Эхний дугаараа авч байгаа хэрэглэгч урамшуулалтай байгаа тул барьцаа 0 гэсэн сонголтыг хийнэ.</li>" +
      "<li>Хэрэглэгчээс эхний ДТ дугаар мөн эсэхийг асуух ба хэрэв эхний ДТ дугаар биш бол салбараас гэрээтэй " +
      "үйлчилгээ авах үед барьцаа байршуулах талаар мэдээлэл өгөх</li></ul><br/>" +
      "<span><strong>9. ХХТ /Хэрэглээ хязгаарлах төвшин/ СОНГОНО.</strong></span><br/>" +
      "<ul><li>Hybrid дугаар бол ХХТ сонгохгүй</li>" +
      "<li>Хэрэв 14,800₮-ийн багц сонгосон бол 20,000₮ дүнг сонгоно.</li>" +
      "<li>Хэрэв 14,800₮-өөс өндөр дүнтэй багц сонгосон бол 40,000₮ дүнг сонгоно.</li></ul><br/>" +
      "<span><strong>10. ХЭРЭГЛЭГЧИД ГЭРЭЭГ ТАНИЛЦУУЛНА:</strong></span><br/>" +
      "<ul><li>Гэрээтэй танилцсаны дараа үйлчилгээний нөхцөл хүлээн зөвшөөрсөн гэсэн хэсгийг зөвлөнө.</li></ul><br/>" +
      "<span><strong>11. ГЭРЭЭНД ГАРЫН ҮСЭГ ЗУРАХ:</strong></span><br/>" +
      "<a><b>!!!</b></a> Хэрэглэгчээр заавал баталгаат гарын үсгийг зуруулна.<br/>" +
      "<br/><a><b>АНХААРАХ:</b></a><br/>" +
      "<a><b>!!!</b></a> Зөвхөн Цахим үнэмлэхтэй хэрэглэгч үйлчилгээ авах боломжтой." +
      "<a><b>!!!</b></a> ДТ багцын суурь хураамж хамгийн ихдээ 39,800₮ дүнтэй байх боломжтой." +
      "<a><b>!!!</b></a> Багцын суурь хураамжаас хамааруулж ХХТ-ийн дүнг зөв сонгоно уу." +
      "<a><b>!!!</b></a> Хэрэглэгчийн мэдээллийн бүрэн, үнэн зөв бөглөх шаардлагатайг анхаарна уу." +
      "<a><b>!!!</b></a> Хэрэглэгчийн сонгосон багцын сар бүрийн суурь хураамж болон нэмэлт хэрэглээ сар бүр " +
      "төлбөр дээр нь нэхэмжлэглэх ба тогтмол төлбөр гарах талаар анхааруулна уу." +
      "<a><b>!!!</b></a> Хэрэглэгчийн багцад тохирсон ХХТ-ийг зөв сонгох шаардлагатайг анхаарна уу." +
      "<a><b>!!!</b></a> Агентаас ДТ болон ХТ үйлчилгээ авсан хэрэглэгчид цаасан гэрээ байгуулахгүй бөгөөд ЦАХИМ /SOFT/ ГЭРЭЭ байгуулна." +
      "</body>",
    image: "forward",
  },
  {
    name: "Монгол АйДи төхөөрөмжтэй агентуудын анхааралд",
    description:
      "<body>" +
      "<h4>Эрхэм Монгол АйДи төхөөрөмжтэй АГЕНТ-уудын анхааралд:</h4>" +
      "<br/>1. Дата сүлжээ муу шинэчлэлийг хурдан татаж авахад асуудалтай байгаа агентуудыг аль болох <a>Wifi сүлжээнд төхөөрөмжөө холбон татаж авна уу</a><br/>" +
      "<br/>2. Шинэчлэлийг татаж байхад сүлжээнээс шалтгаалан тасарсан үед шинэчлэл дахин татагдахдаа <a>'There was problem parsing package'</a> гэсэн алдаа өгвөл " +
      "төхөөрөмж дээр ажиллаж буй бүх апп-уудыг Clear хийн (<a>Төхөөрөмжийн доор байх 3 товчны зүүн талынхыг дараад Trash товч дээр дарна</a>) төхөөрөмжийг Restart " +
      "хийгээд шинэчлэлийг дахин татах.<br/>" +
      "<br/>3. Шинэчлэл хийсэн хэрэглэгчийн нэвтрэх цонхны доор <a>1.0.28</a> гэсэн хувилбар харагдана. (Автоматаар апп шинэчлэлийг санал болгоогүй буюу үүнээс өөр " +
      "хувилбартай хэрэглэгчид Апп-н тусламж хэсгийн Апп шинэчлэх товчийг дарж шинэчлэлийг хийлэх)<br/>" +
      "</body>",
    image: "forward",
  },
  {
    name: "Цэнэглэгч картууд шинэчлэгдлээ",
    description:
      "<body>" +
      "<h4>Сайн байцгаана уу, эрхэм агентууд аа,</h4><br/>" +
      "Мобиком Корпораци нь хэрэглэгчдийнхээ эрэлт, хэрэгцээнд тулгуурлан 2023 оны 10-р сарын 31-ний өдрөөс эхлэн цэнэглэгч картуудаа бүрэн шинэчилж байгааг үүгээр мэдэгдэж байна. Бид байгальд ээлтэй үйлчилгээ үзүүлэх зорилгоор цаасан картаас татгалзаж, шинэчилсэн картуудаа дижитал хэлбэрээр гаргаж байна." +
      "Энэ оны 12-р сарын 01-ний өдрөөс эхлэн хэвлэмэл цаасан картыг борлуулалтаас хасах бөгөөд хэрэглэгч цаасан карт худалдан авсан бол тухайн картын хүчинтэй хугацаанд ашиглах боломжтой.<br/>" +
      "<br/><a><b>Шинэчлэгдсэн нөхцөл:</b></a><br/>" +
      "<br/><h5>Цэнэглэгч карт нь 3 төрлийн сонголттой болж байгаа бөгөөд хэрэглэгч өөрийн хэрэглээнд тохируулан яриа, дата, нэгжээ сонгох авах боломжтой гэдгээрээ давуу талтай.</h5>" +
      "<br><h5>Яриа+Дата эрхтэй цэнэглэгч карт:</h5></br>" +
      "<ul><li>4000₮ - 7 өдөр 1GB дата+ мобикомын сүлжээндээ хязгааргүй яриа</li>" +
      "<li>14000₮ - 30 өдөр 4GB дата + мобикомын сүлжээндээ хязгааргүй яриа</li></ul><br/>" +
      "<li>28000₮ - 30 өдөр 4GB дата + бүх сүлжээнд хязгааргүй яриа</li></ul><br/>" +
      "<br><h5>Нэгж+Дата эрхтэй цэнэглэгч карт:</h5></br>" +
      "<ul><li>4000₮ - 1000₮ нэгж+ 7 өдөр 1GB дата</li>" +
      "<li>14000₮ - 4000₮ нэгж + 30 өдөр 10GB дата</li></ul>" +
      "<li>28000₮ - 4000₮ нэгж + 30 өдөр 24GB дата</li></ul>" +
      "<br><h5>Нэгжтэй цэнэглэгч карт:</h5></br>" +
      "<ul><li>4000₮ - 4000₮ нэгж</li>" +
      "<li>14000₮ - 14000₮ нэгж</li>" +
      "<li>28000₮ - 28000₮ нэгж</li>" +
      "<br><h5>Бүх хэрэглээ багтсан цэнэглэгч карт:</h5></br>" +
      "25000₮ - 5000₮ нэгж+ 30 өдөр 10GB дата+ мобикомын сүлжээнд хязгааргүй яриа Харин 2500₮-н нэгжийн картыг хэрэглэгчид зөвхөн мобиком апликейшнаар авна. Та бүхэн шинэчлэгдсэн картуудаа хэрэглэгчдэдээ санал болгож борлуулалтаа өсгөөрэй." +
      "</body>",
    image: "forward",
  },
  {
    name: "Татан авалтаа хэрхэн хийх вэ",
    description:
      "<body>" +
      "ТА Мобикомоос дараах 5 банкны дансаар автомат татан авалтыг авах боломжтой<br/>" +
      "<br/><strong>ХААН БАНК: <a>5038043999</a></strong><br/>" +
      "<strong>ХХБ: <a>499223583</a></strong><br/>" +
      "<strong>ГОЛОМТ БАНК: <a>2020001509</a></strong><br/>" +
      "<strong>ТӨРИЙН БАНК: <a>106000026979</a></strong><br/>" +
      "<strong>ХАС БАНК: <a>5001138666</a></strong><br/>" +
      "<br/>Татан авалт хийх заавар: Гүйлгээний утга дээрээ өөрийн бүртгэлтэй УТАСНЫ ДУГААР –аа бичнэ." +
      "</body>",
    image: "forward",
  },
  {
    name: "Хамтран ажиллаж байгаа АГЕНТУУДАА",
    description:
      "<body>" +
      "Сайн байцгаана уу, Юуны өмнө хорь гаруй жилийн турш бидэнтэй хамт байсан хамтран ажиллаж байгаа та бүхэндээ халуун талархал дэвшүүлье. " +
      "Мобиком Корпораци хэрэглэгчдийнхээ өдрөөс өдөрт өсөн нэмэгдэж байгаа мэдээллийн технологи, харилцаа холбооны хэрэгцээ шаардлагыг хангасан " +
      "илүү чанартай, найдвартай, илүү ухаалаг, амар хялбар үйлчилгээг үзүүлэхийг зорьж ажиллаж байгаа билээ. " +
      "Энэ зорилгынхоо дагуу бид монгол орны өнцөг булан бүрд байгаа мобикомын хэрэглэгчдэдээ үйлчилгээгээ түргэн шуурхай хүргэх зорилгоор " +
      "борлуулалтын цоо шинэ АГЕНТ сувгаа зах зээлд нэвтрүүлээд байгаа төдийгүй хэрэглэгчдийн маань дуу хоолой болж гүүр болон ажилладаг та бүхэндээ "+
      "АГЕНТ сувгийг зах зээлд таниулах хүндтэй үүргийг хүлээн авсанд талархаж байна. Та бидний хамтын ажиллагаа өдрөөс өдөрт өргөжин дэлгэрч, таны " +
      "бизнесд хувь нэмрээ оруулсаар байна гэдэгт итгэж байна.<br/>" +
      "<br/>Хүндэтгэсэн Мобиком ХХК" +
      "</body>",
    image: "forward",
  }
];

const NoRoute = () => (
  <AppTextError>Уучлаарай уг үйлчилгээг үзүүлэх боломжгүй байна.</AppTextError>
);
const NewRoute = ({ navigation }) => (
  <AppContent>
    {helpList && helpList.length ? (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={helpList}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <View>
            <ProductItem
              product={item}
              name={item.name}
              onPress={() => navigation.navigate("detail", {
                name: item.name,
                description: item.description,
              })}
              icon={helpIcons[item.image]}
            />
          </View>
        )}
      />
    ) : (
        <AppTextError>Хоосон жагсаалт</AppTextError>
      )}
  </AppContent>
);

const Stack = createStackNavigator();
const HelpScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="new"
      screenOptions={{
        headerRight: () => <AppToolbar />,
      }}
    >
      <Stack.Screen
        name="new"
        component={NewRoute}
        options={{ title: "Тусламж" }}
      />
      <Stack.Screen
        name="detail"
        component={HelpDetail}
        options={{ title: "Дэлгэрэнгүй" }}
      />
      <Stack.Screen name="NoRoute" component={NoRoute} />
    </Stack.Navigator>
  );
};

export default HelpScreen;