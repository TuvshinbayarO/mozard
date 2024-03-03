import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getPostNumberLists = (prefix, offset, limit) =>
// ?prefix=85******&offset=0&limit=30&channel=web
  client.get(
    ConstantAPI.PROVISION.API.POST_NUMBERS + `?prefix=${prefix}&offset=${offset}&limit=${limit}&type=${2}`
  );

export default {
    getPostNumberLists,
};
