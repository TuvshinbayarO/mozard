import client from "./client";
import ConstantAPI from "./ConstantAPI";

const getKhoroos = (cityId, districtId) =>
  client.get(
    ConstantAPI.REST.API.KHOROOS + "?cityId=" + cityId + "&districtId=" + districtId
  );

export default {
  getKhoroos,
};
