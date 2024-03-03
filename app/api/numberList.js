import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getNumberLists = (prefix, offset, limit) =>
// ?prefix=85******&offset=0&limit=30&channel=web
  client.get(
    ConstantAPI.PROVISION.API.NUMBER_LIST + `?prefix=${prefix}&offset=${offset}&limit=${limit}`
  );

export default {
  getNumberLists,
};
