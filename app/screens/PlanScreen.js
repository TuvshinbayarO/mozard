import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView } from "react-native";
import AppScreen from "../components/AppScreen";
import { LinearGradient } from "expo-linear-gradient";
import AppTopMenu from "../components/AppTopMenu";

const { width, height } = Dimensions.get("window");

const topup = [
  {
    type: "topup",
    title: "Төлөвлөгөө",
    amount: "500000",
  },
  {
    type: "topup",
    title: "Гүйцэтгэл",
    amount: "375000",
  },
  {
    type: "topup",
    title: "Дутуу",
    amount: "145000",
  },
  {
    type: "number",
    title: "Төлөвлөгөө",
    amount: "100000",
  },
  {
    type: "number",
    title: "Гүйцэтгэл",
    amount: "175000",
  },
  {
    type: "number",
    title: "Дутуу",
    amount: "45000",
  },
  {
    type: "payment",
    title: "Төлөвлөгөө",
    amount: "500000",
  },
  {
    type: "payment",
    title: "Гүйцэтгэл",
    amount: "375000",
  },
  {
    type: "payment",
    title: "Дутуу",
    amount: "145000",
  },
];

const customerInfo = {
  code: "1220",
  chargingAmount: "500000",
  sales: "345000",
  balance: "145000",
  startDate: "2020.12.01",
  endDate: "2020.12.31",
  percent: "95%",
};

function PlanScreen(props) {
  const { user } = useAuth();
  // const handleOnPress = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => {
  //         Alert.alert("I know")
  //       },
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // };

  return (
    <AppScreen style={[{ width: width - 20 }]}>
      <AppTopMenu></AppTopMenu>
      <View>
        <Text
          style={[
            {
              marginTop: 10,
              marginLeft: 20,
              color: "#24173D",
              fontSize: 12,
              fontWeight: "500",
            },
          ]}
        >
          Хэрэглэгчийн дугаар
        </Text>
        <Text
          style={[
            {
              marginLeft: 20,
              color: "#E81E25",
              fontSize: 24,
              fontWeight: "700",
            },
          ]}
        >
          {user ? user.dealerCode : ""}
        </Text>
      </View>
      <LinearGradient
        colors={["red", "blue"]}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 0.4, 1]}
        style={[{ borderRadius: 30, marginTop: 30, marginLeft: 20 }]}
      >
        <View
          style={{
            borderWidth: 0,
            padding: 30,
          }}
        >
          <Text style={[{ color: "white", fontSize: 14, fontWeight: "500" }]}>
            Татан авалт
          </Text>
          <Text style={[{ color: "white", fontSize: 22, fontWeight: "700" }]}>
            {customerInfo.chargingAmount}
          </Text>
          <Text
            style={[
              {
                color: "white",
                fontSize: 14,
                fontWeight: "500",
                marginTop: 10,
              },
            ]}
          >
            НИЙТ БОРЛУУЛАЛТ
          </Text>
          <Text style={[{ color: "white", fontSize: 22, fontWeight: "700" }]}>
            {customerInfo.sales}
          </Text>
          <Text
            style={[
              {
                color: "white",
                fontSize: 14,
                fontWeight: "500",
                textAlign: "right",
              },
            ]}
          >
            Дансны үлдэгдэл
          </Text>
          <Text
            style={[
              {
                color: "white",
                fontSize: 28,
                fontWeight: "700",
                textAlign: "right",
              },
            ]}
          >
            {customerInfo.balance}
          </Text>
          <Text
            style={[
              {
                color: "white",
                fontSize: 12,
                fontWeight: "500",
                textAlign: "right",
                marginTop: 10,
              },
            ]}
          >
            Хамрах хугацаа: {customerInfo.startDate} - {customerInfo.endDate}
          </Text>
        </View>
      </LinearGradient>
      {/* <AppButton onPress={handleOnPress} title="Back" /> */}
      <View>
        <Text
          style={[
            {
              fontSize: 22,
              fontWeight: "600",
              marginTop: 30,
              marginBottom: 20,
              marginLeft: 20,
            },
          ]}
        >
          ТӨЛӨВЛӨГӨӨ
        </Text>
        {/* <Image>{require("../assets/Unit.png")}</Image> */}
      </View>
      <View>
        <ScrollView horizontal>
          <View
            style={[
              {
                borderWidth: 1,
                borderRadius: 24,
                height: 236,
                width: 192,
                color: "#000010",
                marginLeft: 20,
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "700",
                  color: "red",
                  textAlign: "left",
                  marginLeft: 20,
                  marginTop: 20,
                },
              ]}
            >
              TOP UP
              <Image
                style={[{ width: 30, height: 30, marginLeft: 50 }]}
                source={require("../assets/Unit.png")}
              ></Image>
            </Text>
            {topup
              .filter((user) => user.type == "topup")
              .map((item) => (
                <View key={item.code}>
                  <Text
                    style={[
                      {
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#191970",
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              ))}
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: "800",
                  color: "red",
                  textAlign: "right",
                  marginRight: 10,
                  marginLeft: 20,
                },
              ]}
            >
              {customerInfo.percent}
            </Text>
          </View>
          <View
            style={[
              {
                borderWidth: 1,
                borderRadius: 24,
                height: 236,
                width: 192,
                color: "#000010",
                marginLeft: 20,
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "700",
                  color: "red",
                  textAlign: "left",
                  marginLeft: 20,
                  marginTop: 20,
                },
              ]}
            >
              ДУГААР
              <Image
                style={[{ width: 30, height: 30, marginLeft: 50 }]}
                source={require("../assets/Unit.png")}
              ></Image>
            </Text>
            {topup
              .filter((user) => user.type == "number")
              .map((item) => (
                <View key={item.code}>
                  <Text
                    style={[
                      {
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#191970",
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              ))}
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: "800",
                  color: "red",
                  textAlign: "right",
                  marginRight: 10,
                  marginLeft: 20,
                },
              ]}
            >
              {customerInfo.percent}
            </Text>
          </View>
          <View
            style={[
              {
                borderWidth: 1,
                borderRadius: 24,
                height: 236,
                width: 192,
                color: "#000010",
                marginLeft: 20,
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "700",
                  color: "red",
                  textAlign: "left",
                  marginLeft: 20,
                  marginTop: 20,
                },
              ]}
            >
              ТӨЛБӨР
              <Image
                style={[{ width: 30, height: 30, marginLeft: 40 }]}
                source={require("../assets/Unit.png")}
              ></Image>
            </Text>
            {topup
              .filter((user) => user.type == "payment")
              .map((item) => (
                <View key={item.code}>
                  <Text
                    style={[
                      {
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#191970",
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              ))}
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: "800",
                  color: "red",
                  textAlign: "right",
                  marginRight: 10,
                  marginLeft: 20,
                },
              ]}
            >
              {customerInfo.percent}
            </Text>
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    color: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
  },
});

export default PlanScreen;
