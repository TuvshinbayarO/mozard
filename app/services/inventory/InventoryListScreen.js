import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, FlatList, Image, KeyboardAvoidingView, Text, Alert, Dimensions } from "react-native";
import product from "../../api/product";
import AppCheckbox from "../../components/AppCheckbox";
import AppText from "../../components/AppText";
import useApi from "../../hooks/useApi";
import { homeIcons } from "../../assets/Images";
import Styles from "../../resources/Styles";
import AppLoader from "../../components/AppLoader";
import AppContent from "../../components/AppContent";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import sell from "../../api/sell";

const defaultParams = {
  status: 1,
  offset: 0,
  limit: 100,
};

const { width } = Dimensions.get("window");

function InventoryListScreen({ route: { params } }) {
  const [inventory, setInventory] = useState([]);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const {
    request: loadInventories,
    data: { result },
    loading
  } = useApi(product.getInventories);
  const { request: getBillPreview, loading: loadingPreview } = useApi(sell.preview);
  const [info, setInfo] = useState();
  const productId = params.option?.productId || '';

  const getInventories = async () => {
    await loadInventories({
      ...defaultParams,
      productId: params.option?.productId,
    });
  };

  const checkInventory = (selectedItem) => {
    const exist = inventory.filter(i => i === selectedItem);
    if (exist.length) {
      const others = inventory.filter(i1 => i1 !== selectedItem);
      setInventory([...others]);
    } else {
      setInventory([...inventory, selectedItem]);
    }
  };

  const checkAll = () => {
    if (checked) {
      setInventory([]);
    } else {
      setInventory([...result.map(m => m.invId)]);
    }
    setChecked(!checked);
  }

  useEffect(() => {
    if (productId !== '' && productId !== undefined && productId !== null) {
      getInventories();
    }
  }, []);

  const handleCancel = () => {
    navigation.navigate("Home", {screen: "Product"});
  };

  const handlePress = () => {
    if (inventory.length === 0)
      return Alert.alert("Борлуулах бараагаа сонгоно уу !");
    
    const data = {
      prodOptId: params.option.prodOptId,
      autoVat: true,
      buhel: '',
      email: 'nomail@nomail.mn',
      passRead: false,
      skipBO: true,
      invIds: inventory,
      paymentType: 0
    };
    getBillPreview(data)
      .then((response) => {
        if (response.code === 200) {
          setInfo(null);
          navigation.navigate("Info", {
            amount: response.result.payAmount,
            invIds: inventory,
            name: params.option?.prodOptName || '',
            prodOptId: params.option.prodOptId,
            title: "Карт"
          });
        } else if (response.code === 400) {
          setInfo(response.info ? response.info : "Төлбөрийн мэдээлэл харуулах боломжгүй.")
        }
      })
      .catch((error) => {
        setInfo("Төлбөрийн мэдээлэл харуулах боломжгүй. ");
      });
  };

  return (
    <AppContent>
      <AppLoader visible={loading} />
      {result && result.length > 0 ? (
        <KeyboardAvoidingView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[
                Styles.textDarkBlue,
                width > 700 ? Styles.text28 : Styles.text16,
                Styles.fontWeight400
              ]}
            >
              {params.option?.prodOptName || 'Цаасан карт'}
            </Text>
            <Text></Text>
            {info &&
              <Text style={[Styles.textRed]}>{info}</Text>
            }
            <AppCheckbox isChecked={checked} onPress={checkAll} label="Check all" />
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={result}
              keyExtractor={(item) => item.invId.toString()}
              renderItem={({ item }) => (
                <AppCheckbox
                  isChecked={inventory.includes(item.invId) ? true : false}
                  label={item.invUid}
                  onPress={() => {
                    checkInventory(item.invId);
                  }}
                />
              )}
            />
            <AppButton onPress={handlePress} title="Үнэ бодох" disabled={!inventory || inventory.length === 0} />
            <AppButton onPress={handleCancel} style={Styles.bgGray} title="Цуцлах" />
          </ScrollView>
        </KeyboardAvoidingView>
      ): (
        <>
          <Image resizeMode={'contain'} style={[Styles.icon64]} source={homeIcons["yellowWarning"]} />
          <AppText style={[{ 
            color: "#6581AF", 
            lineHeight: 34.13,
            marginTop: 20, 
            letterSpacing: -1}
            , width > 700 ? Styles.text34 : Styles.text20, Styles.fontWeight400]}>
            Уучлаарай, Энэ үйлчилгээг хийх боломжгүй байна.
          </AppText>
        </>
      )}
      
    </AppContent>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default InventoryListScreen;
