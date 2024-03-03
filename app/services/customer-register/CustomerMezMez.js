import { View, Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import ExpoDraw from 'expo-draw'
import { captureRef } from 'react-native-view-shot';
import AppModal from '../../components/AppModal';
import AppButton from '../../components/AppButton';
import AppCheckbox from '../../components/AppCheckbox';
import Styles from "../../resources/Styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import signatureUpload from '../../api/signatureUpload';

const { width, height } = Dimensions.get("window");

const CustomerMez = ({ route: { params } }) => {

      const navigateToScreenA = () => {
        const dataToPass = {
            parameter1: isMez,
            parameter2: signaturePath,
        };
        navigation.navigate('Info', { params: dataToPass });
    };
      
    
    const [isSignatureBase, setIsSignatureBase] = useState()
    const viewToSnapshotRef = useRef();
    const [snapshotImg, setSnapshotImg] = useState();
    const [modal, setModal] = useState(false);
    const [clear, setClear] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [isMez, setIsMez] = useState('true')
    const [signaturePath, setSignaturePath] = useState()
    const navigation = useNavigation(); 

    const navBack = () => {
        // First, pop the current screen
        navigation.dispatch(StackActions.pop(1));
        
        // Then, navigate to Screen A
        navigateToScreenA();
    }
    

    const handleChecked = () => {
        setIsMez(!isMez);
    };


    const close = async () => {
        setModalVisible(false)
        await signatureUpload.signatureUploadFile({base64: isSignatureBase, type: "string"}).then((res) => {
            console.log('response==========================', res)
            setSignaturePath(res.data.result)
        })

    }

    const snapshot = async () => {
        const result = await captureRef(viewToSnapshotRef, { result: 'tmpfile', format: 'png' });
        const signatureBase = await captureRef(viewToSnapshotRef, { result: 'base64' });
        setSnapshotImg(result);
        setIsSignatureBase(signatureBase)
        setModal(true)

        await signatureUpload.signatureUploadFile({base64: isSignatureBase, type: "string"}).then((res) => {
            console.log('response==========================', res)
            setSignaturePath(res.data.result)
        })

      };

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <>
                <AppModal
                    title="Гарын үсэг зурах"
                    isVisible={modalVisible}
                    successText="OK"
                    onDismiss={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={{ height: 500, padding: 20 }}>
                        <View ref={viewToSnapshotRef} collapsable={false} style={{ flex: 1 }}>
                            <ExpoDraw
                                strokes={[]}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', height: height, width: width }}
                                clear={(clearFn) => {
                                    setClear(() => clearFn);
                                }}
                                color={'#000'}
                                strokeWidth={3}
                                enabled={true}
                            />
                        </View>
                        <AppModal isVisible={modal} onDismiss={() => setModal(false)} title="Гарын үсэг">
                            <View style={{ height: 500 }}>
                                {snapshotImg && <Image resizeMode="contain" style={[styles.snapshotImg, { height: 500 }]} source={{ uri: snapshotImg }} />}
                            </View>
                            <AppButton onPress={close} title={"Хадгалах"} style={Styles.bgRed} />
                        </AppModal>
                        <AppButton onPress={snapshot} title={"Хянах"} style={Styles.bgRed} />
                        <AppButton onPress={() => clear()} title={"Цэвэрлэх"} style={Styles.bgBlue} />
                    </View>
                </AppModal>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[styles.mezHeader]}>
                        <Image style={{width: 75, height: 40, resizeMode: 'cover'}} source={require('../../assets/logo.png')} />
                        <Text style={{fontWeight: 'bold', color: 'gray'}}>Зөвшөөрлийн хуудас</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{width: '90%', borderBottomColor: 'red', borderBottomWidth: 1}}></View>
                    <View style={{justifyContent: 'center' ,alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20}}>Мэдээлэллийн эзний Зөвшөөрөл</Text>
                    </View>
                    <Text style={{fontSize: 12, marginTop: 20}}>Монгол улсад “Нийтийн мэдээллийн ил тод байдлын тухай”, “Хүний хувийн мэдээлэл хамгаалах тухай” хуулиудыг 2022 оны 5-р сарын 1-ний өдрөөс эхлэн дагаж мөрдөх болсонтой холбогдуулан Мобиком Корпораци ХХК болон түүний охин, хараат компани /үйлчилгээ үзүүлэгч гэх/-ийн бүтээгдэхүүн үйлчилгээг хүргэхдээ хүний хувийн мэдээллийг цуглуулах, боловсруулах, ашиглахад дараах нөхцөлийг баримтлан, хэрэгжүүлнэ.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>1. Үйлчилгээ үзүүлэгч нь холбогдох хууль, тогтоомжид заасны дагуу хэрэглэгчийг таних, баталгаажуулах, бүртгэлжүүлэх, мөн бүтээгдэхүүн үйлчилгээг сайжруулах, хэрэглэгчийн санал гомдлыг хүлээн авч шийдвэрлэх, дүн шинжилгээ хийх, төлбөр цуглуулах, урамшуулал сурталчилгааны мэдээлэл, мэдэгдэл хүргэх зорилгоор хүний хувийн мэдээллийг цуглуулж, боловсруулж, ашиглана.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>2. Хүний хувийн мэдээлэл гэдэгт овог нэр, нас хүйс, цахим тодорхойлогч (утасны дугаар, и-мэйл хаяг, нийгмийн сүлжээний нэр гэх мэт), оршин суух хаяг, байршил, регистр эсхүл иргэний бүртгэлийн дугаар, зээлийн мэдээлэл, хуулиар зөвшөөрсөн биометрик болон бусад мэдээллүүдийг ойлгоно.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>3. Үйлчилгээ үзүүлэгч нь бүтээгдэхүүн үйлчилгээнд сайжруулалт хийх, шинэ бүтээгдэхүүн үйлчилгээг санал болгох зорилгын хүрээнд хуульд заасан үндэслэл, журмын дагуу эсвэл мэдээллийн эзний зөвшөөрлөөр хүний хувийн мэдээллийг гуравдагч этгээдэд дамжуулж болно. Үүнд: хэрэглэгчтэй гэрээ байгуулах, байгуулсан гэрээний хэрэгжилтийг хангах, урамшуулал, хөнгөлөлт гэх зэрэг маркетингийн үйл ажиллагаанд, гар утас төхөөрөмж засварлах, сүлжээний хүртээмж чанарыг сайжруулах, төлбөр цуглуулах, хууль тогтоомжоор хүлээсэн эрх үүргээ биелүүлэх зэргийг ойлгоно.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>4. Үйлчилгээ үзүүлэгч нь гэрээний хүчин төгөлдөр хугацаанд, гэрээ дуусгавар болсноос хойш гэрээний үүргийн биелэлтийг хангахтай холбоотойгоор үүсэх шаардах эрхийг хэрэгжүүлэх эсхүл хууль тогтоомжид заасан хугацаанд хүний хувийн мэдээллийг боловсруулж, ашиглах эрхтэй байна.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>5. Үйлчилгээ үзүүлэгч нь хүний хувийн мэдээллийг олон нийтэд ил болгохгүй бөгөөд цуглуулах, ашиглах, боловсруулах явцад санаатай болон санамсаргүйгээр алдах, устгах, өөрчлөх, хуулбарлах, бусад хууль бус ажиллагаанаас хамгаална.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>6. Үйлчилгээ авч буй хэрэглэгч бичгээр хүсэлт гарган Үйлчилгээ үзүүлэгчид олгосон өөрийн хувийн мэдээллийг цуглуулах, ашиглах, боловсруулах зөвшөөрлөө цуцлах эрхтэй.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>7. Энэхүү нөхцөлийг уншиж танилцсанаар хэрэглэгч үйлчилгээ үзүүлэгчийн үйлчилгээг авах боломжтой болох бөгөөд нөхцөлтэй танилцаагүйгээс үүдэн гарах аливаа асуудлыг Үйлчилгээ үзүүлэгч хариуцахгүй болно.</Text>
                    <Text style={{fontSize: 12, padding: 10}}>8. Үйлчилгээ үзүүлэгч нь хэрэглэгчийг танин, баталгаажуулсны үндсэн дээр бүртгэл хийх шаардлагын дагуу хэрэглэгчийн баримт бичиг, Төрийн мэдээлэл солилцооны системд бүртгэгдсэн мэдээлэлд үндэслэн бүтээгдэхүүн, үйлчилгээ үзүүлэх тул хэрэглэгч нь энэхүү зөвшөөрлийн хуудаст гарын үсэг зурснаар тус системд бүртгэгдсэн өөрийн хувийн мэдээллийг цуглуулж, боловсруулж, ашиглахыг зөвшөөрч байгаагаа баталгаажуулж байгаа болно</Text>
                    <View style={{flexDirection: 'row', width: '100%', padding: 10}}><Text style={{fontSize: 12}}>9.</Text><Text style={{fontSize: 12}}> Энэхүү хуудаст гарын үсэг зурснаар хэрэглэгч та:</Text></View>
                    <View>
                        <Text style={{fontSize: 12, padding: 10}}>
                            9.1 Үйлчилгээг хүүхэд авч байгаа тохиолдолд тухайн үйлчилгээ үзүүлж буй этгээд хүүхдийн тань мэдээллийг цуглуулах, боловсруулах, ашиглах;
                        </Text>
                        <Text style={{fontSize: 12, padding: 10}}>
                            9.2 Зөвхөн тухайн бүтээгдэхүүн үйлчилгээг үзүүлж буй үйлчилгээ үзүүлэгчид энэхүү зөвшөөрлийг өгч байгаа болно.
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 12, padding: 10}}>.......... овогтой .......... миний бие /PД:………………………………………./ дээр дурдсан нөхцөлүүдийг бүрэн уншиж танилцан, хүлээн зөвшөөрч байгаагаа баталж, өөрийн сайн дурын үндсэн дээр энэхүү зөвшөөрлийг олгож байгаа болно.</Text>
                    </View>
                    <View style={{marginLeft: 80}}>
                        <Text style={{fontSize: 12, padding: 10}}>Гарын үсэг: ..................</Text>
                        <Text style={{fontSize: 12, padding: 10}}>Утасны дугаар: ..................</Text>
                    </View>
                    <Text style={{fontSize: 12, padding: 10}}>202… оны ... сарын ... өдөр</Text>
                    <Text style={{fontSize: 12, padding: 10}}>Мобиком Групп, Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, ЮНЕСКО-ийн гудамж – 28, МПМ Цогцолбор, Утас: 7575-9944 Лавлах: 2222</Text>
                </View>
                <AppCheckbox
                    label='Зөвшөөрөх'
                    onPress={handleChecked}
                    isChecked={isMez}
                />
                <AppButton
                    title='Гарын үсэг зурах'
                    onPress={() => setModalVisible(true)}
                />
                <AppButton onPress={navBack} title='Хадгалах' style={Styles.bgRed} />
            </>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    snapshot: {
      borderColor: "#000000",
      borderWidth: 2,
      backgroundColor: "#00ffff",
      margin: 16,
      padding: 16
    },
    snapshotImg: {
      width: '100%',
      height: 500,
      // margin: 10
    },
    mezHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '90%',
        marginTop: 20
    }
  });

export default CustomerMez