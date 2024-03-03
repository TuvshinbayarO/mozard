import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getPostSearchIsdn = (prefix, offset, limit) =>
  client.get(
    // ?prefix=95******&offset=0&limit=30&type=2&channel=web
    ConstantAPI.PROVISION.API.POST_NUMBERS + `?prefix=${prefix}&offset=${offset}&limit=${limit}&type=${2}`
  );

export default {
    getPostSearchIsdn,
};
