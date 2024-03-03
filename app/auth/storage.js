import * as SecureStore from "expo-secure-store";

const key = "user";

const storeUser = async (user) => {
  try {
    const data = JSON.stringify(user);
    await SecureStore.setItemAsync(key, data);
  } catch (error) {
    console.log("Error storing user", error);
  }
};

const getUser = async () => {
  try {
    const data = await SecureStore.getItemAsync(key);
    return JSON.parse(data);
  } catch (error) {
    console.log("Error getting user", error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing user", error);
  }
};

const cookie = "cookie";

const storeCookie = async (item) => {
  try {
    await SecureStore.setItemAsync(cookie, item);
  } catch (error) {
    console.log("Error storing cookie", error);
  }
};

const getCookie = async () => {
  try {
    const data = await SecureStore.getItemAsync(cookie);
    return data;
  } catch (error) {
    console.log("Error getting cookie", error);
  }
};

const removeCookie = async () => {
  try {
    await SecureStore.deleteItemAsync(cookie);
  } catch (error) {
    console.log("Error removing cookie", error);
  }
};

const put = async (name, value) => {
  try {
    console.log(`storage put -> ${name}: ${value}`);
    await SecureStore.setItemAsync(name, value);
  } catch (error) {
    console.log("Error saving data", error);
  }
};

const get = async (name) => {
  try {
    const value =  await SecureStore.getItemAsync(name);
    console.log(`storage get -> ${name}: ${value}`);
    return value;
  } catch (error) {
    console.log("Error getting data", error);
  }
  return null;
};

const del = async (name) =>{
  try {
    const value =  await SecureStore.deleteItemAsync(name);
    console.log(`storage get -> ${name}: ${value}`);
    return value;
  } catch (error) {
    console.log("Error getting data", error);
  }
  return null;
}

export default { getUser, removeUser, storeUser, getCookie, removeCookie, storeCookie, put, get, del };
