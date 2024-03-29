import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefix = "cache_";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = { value, timestamp: Date.now() };
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > expiryInMinutes;
};

export default {
  store,
  get,
};
