import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getAccountInfo = () => client.get(ConstantAPI.REST.API.ACCOUNT_INFO);

const getSalesInfo = () => client.get(ConstantAPI.REST.API.REPORT + "/sales");

const getPurchaseInfo = () =>
  client.get(ConstantAPI.REST.API.REPORT + "/purchase");

const getRecentInfo = () => client.get(ConstantAPI.REST.API.RECENT);

const getRecentTransition = () =>
  client.get(ConstantAPI.REST.API.RECENT_TRANSACTION);

const getTargetInfo = () =>
  client.get(ConstantAPI.REST.API.TARGET + `?sort=-targetMonth`);

const getTargetSubInfo = (targetId) =>
  client.get(
    ConstantAPI.REST.API.TARGET +
      `/${targetId}/performancenew?incProduct=true&incProductOpt=true`
  );

export default {
  getAccountInfo,
  getSalesInfo,
  getPurchaseInfo,
  getRecentInfo,
  getTargetInfo,
  getTargetSubInfo,
  getRecentTransition,
};
