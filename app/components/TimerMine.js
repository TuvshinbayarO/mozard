import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useAuth from "../hooks/useAuth";
import AppButton1 from "./AppButton1";

const TimerMine = ({
  time = 60 * 1000 * 10,
  setTime = () => {},
  timerOn = false,
  setTimerOn = () => {},
  type = "default",
}) => {
  console.log(`ActiveTime: ${time}`);
  console.log(`ActiveTimeOn: ${timerOn}`);
  const { logout } = useAuth();
  useEffect(() => {
    let interval = null;

    if (timerOn && time > 1000) {
      interval = setInterval(() => {
        if (time > 999 && timerOn) {
          const tt = time - 1000;
          setTime((prev) => prev - 1000);
        }
      }, 1000);
    } else if (!timerOn || time <= 0) {
      clearInterval(interval);
      console.log("first");
      
      logout();
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  React.useEffect(() => {
    if (time < 1000) {
      setTimerOn(false);
    }
  }, [time]);

  if (type == "default") {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Time::: {time}</Text>
      </View>
    );
  } else {
    return <View />;
  }
};

export default TimerMine;
