import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getSearchIsdn = (prefix, offset, limit) =>
// ?prefix=85******&offset=0&limit=30&channel=web
// ?prefix=${item.prefix || '********'}&offset=${item.offset || 0}&limit=${item.limit || 50}
  client.get(
    ConstantAPI.PROVISION.API.NUMBER_LIST + `?prefix=${prefix}&offset=${offset}&limit=${limit}`
  );

export default {
  getSearchIsdn,
};
