const BASE_URL = "https://dealer.mobicom.mn/api/d";
const LOGIN_URL = "https://dealer.mobicom.mn";
const url2 = "/dealer-api/rest/dealer";
const url3 = "/provision-builtin/rest";
const url4 = "https://z-wallet.monpay.mn/v2/oauth/token";
const url5 = "/dealer-api/rest";
export default {
  BASE_URL,
  LOGIN_URL,
  REST: {
    API: {
      URL: url2 + "/dealer",
      LOGIN: url2 + "/login",
      LAST_TRANSACTION: url2 + "/account",
      ACCOUNT_INFO: url2 + "/account",
      PRODUCT_LIST: url2 + "/products",
      PROMO_LIST: url2 + "/promos",
      PASSWORD: url2 + "/password",
      ISDN: url5 + "/branches/getisdn",
      PINCODE_CHANGE: url5 + "/branches/passtxn/set",
      PINCODE_RESTORE: url5 + "/branches/passtxn/set",
      PINCODE_CHECK: url5 + "/branches/passtxn/check",
      REPORT: url2 + "/report",
      INVENTORY: url2 + "/inventories",
      DEALER: url2 + "/search",
      CITIES: url2 + "/cities",
      DISTRICTS: url2 + "/districts",
      KHOROOS: url2 + "/khoroos",
      PACKS: url3 + "/v2/numbers",
      PRODUCT_PREVIEW: url2 + "/sale/product/preview",
      RECENT: url2 + "/report/sales/recent",
      ISDN: url5 + "/branches/getisdn",
      PRINT: url2 + "/sale",
      PRODUCTS: url2 + "/report/purchase/products",
      OPTIONS: url2 + "/report/purchase/products",
      TARGET: url2 + "/targets",
      RECENT_TRANSACTION:
        url2 + `/account/transactions?limit=${10}&offset=${0}`,
      DSIGN: url3 + `/v2/xyp/isdn`,
      CONTRACT_POST: url3 + `/v2/numbers/contract/json`,
      NUMBER_LIMIT: url3 + `/ams/numberlimit`,
      CONFIRM_POST: url5 + `/dealer/sale/product/confirm`,
    },
  },
  PROVISION: {
    API: {
      URL: url3,
      PREVIEW: url2 + "/sale/product/preview",
      CONFIRM: url2 + "/sale/product/confirm",
      BILL: url2 + "/bill",
      HBB: url2 + "/task",
      MONPAY: url3 + "/candy/cashout",
      CUSTOMER_REGISTER: url3 + "/postgw/phoneinfo",
      AMS_USER: url3 + "/ams/user",
      CHECK_LEASING: url3 + "/leasing/check",
      PREPAID_NUMBERS: url3 + "/number/list",
      MEZ_PREVIEW: url3 + "/number/getcontract",
      POST_NUMBERS: url3 + "/number/list",
      CHANGE_STATUS: url3 + "/number/changestatus",
      RATEPLANS: url3 + "/number/rateplans",
      NUMBER_LIMIT: url3 + "/ams/numberlimit",
      POST_BILL: BASE_URL + url3 + "/bill",
      POST_FIELD: url3 + "/v2/numbers",
      CIVIL_ID: url3 + "/ams/register",
      OTP: url3 + "/otp", // eniig ustgana,
      TAN_CREATE: url3 + `/tan/create`,
      TAN_CONFIRM: url3 + `/tan/confirm`,
      FILE_UPLOAD: url2 + "/file",
      NUMBER_LIST: url3 + `/number/list`,
    },
  },
  UPLOAD: {
    API: {
      URL: url5,
      UPLOAD: url5 + "/file/upload",
      WALLET_URL: url5 + "/app/monpay/url",
    },
  },

  FETCH_TIMEOUT: 40000,

  DEEPLINK: "mobicomdealerapp://payment",
  BRANCH_ID: "dealerapp",
};
