import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Button,
  Dimensions,
  Platform,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import AppScreen from "../components/AppScreen";
import {
  AppForm,
  AppFormField,
  AppSubmitBtn,
  AppErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";
import Styles from "../resources/Styles";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import info from "../api/info";
import AppCheckbox from "../components/AppCheckbox";
import storage from "../auth/storage";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Нэвтрэх нэрээ оруулна уу.")
    .label("Username"),
  password: Yup.string()
    .required("Нууц үгээ оруулна уу.")
    .min(4)
    .label("Password"),
});

const { width, height } = Dimensions.get("window");
// height = Math.floor(height)

function LoginScreen(props) {
  const { user } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [hidePassword, changePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const { request: getInfo } = useApi(info.getInfo);
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formikRef = useRef();



  const load = async () => {
    setUsername(await storage.get("username"));
    setPassword(await storage.get("password"));
  };

  useEffect(() => {
    load()
  }, []);

  const managePasswordVisibility = (hidePassword) => {
    if (hidePassword) {
      changePassword(false);
    } else if (!hidePassword) {
      changePassword(true);
    }
  };

  const { login, saveCookie } = useAuth();

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async () => {
    console.log("username:", username)
    console.log("password:", password)
    const result = await authApi.login(username, password);
    if (!result.ok) {
      setLoginFailed(true);
      setErrorMessage(result.data)
      console.log("bolsongue login", result)
    } else {
      if (isChecked) {
        storage.put("username", username);
        storage.put("password", password);
      } else {
        storage.put("username", username);
        storage.put("password", "");
      }
      await storage.del("register")
      await storage.del("gSignIsdn")
      await storage.del("withGsign")

      const cookie = result.headers["set-cookie"][0];
      await saveCookie(cookie);
      console.log("cookie:", cookie)

      const res = await getInfo(cookie);
      setLoginFailed(false);
      const newInfo = {
        accountId: res.accountId,
        branchType: res.branchType,
        candyId: res.candyId,
        dealerCode: res.dealerCode,
        dealerId: res.dealerId,
        dealerRole: res.dealerRole,
        phone: res.phone,
      };

      login(newInfo);
    }
  };

  return (
    <AppScreen style={{ height: height }}>
      <KeyboardAvoidingView style={[Styles.containerWhite, Styles.p24]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled keyboardVerticalOffset={0}>
        <View style={[Styles.center, { flex: 1 }]}>
          <Image source={require("../assets/dealer_new_icon4.png")} />
        </View>
        <View style={[Styles.centerJustify, { flex: 1 }]}>
          <AppText
            style={[
              Styles.textBlue2,
              width > 700 ? Styles.text26 : Styles.text18,
            ]}
          >
            Моби дилер {"\n"}аппликейшнд тавтай морил
          </AppText>
        </View>
        <View style={[{ flex: 3 }]}>
          <AppForm
            initialValues={{ username, password }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage
              error={errorMessage}
              visible={loginFailed}
            />
            <AppFormField
              name="Username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Нэвтрэх нэр"
              onChangeText={(value) => { setUsername(value); console.log('username===========', username) }}
              value={username}
            />
            <AppFormField
              name="Password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Нууц үг"
              secureTextEntry={hidePassword}
              icon={hidePassword ? "eye-slash" : "eye"}
              onChangeText={(value) => { setPassword(value); console.log('password============', password) }}
              value={password}
              onPress={() => managePasswordVisibility(hidePassword)}
            />
            <View style={[Styles.mT10]}></View>
            <AppCheckbox
              label="Сануулах"
              onPress={handleChecked}
              isChecked={isChecked}
            />

            <AppSubmitBtn
              title="Нэвтрэх"
              onPress={handleSubmit}
              style={[Styles.mTB24, Styles.bgRed]}
            />

            {Platform.OS === "android" ? (
              <Text
                style={[
                  width > 700 ? Styles.text26 : Styles.text14,
                  Styles.textBlue,
                  { textAlign: "center" },
                ]}
                onPress={() =>
                  Alert.alert(
                    "",
                    "Та бүртгэлтэй дугаараасаа 230 дугаарт “Pass” зай аваад дугаараа бичиж нууц үгээ сэргээнэ үү."
                  )
                }
              >
                Нууц үг мартсан?
              </Text>
            ) : (<>

              <Button
                title="Нууц үг мартсан?"
                style={[
                  Styles.mTB24,
                  Styles.bgRed,
                  width > 700 ? Styles.text26 : Styles.text14,
                ]}
                onPress={() =>
                  Alert.alert(
                    "",
                    "Та бүртгэлтэй дугаараасаа 230 дугаарт “Pass” зай аваад дугаараа бичиж нууц үгээ сэргээнэ үү."
                  )
                }
              />


            </>
            )}
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  btnContainer: {
    padding: 20,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

export default LoginScreen;
