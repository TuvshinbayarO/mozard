export default () => {
  const numberFormat = (value) => {
    try {
      // return new Intl.NumberFormat("mn-MN", {
      //   style: "currency",
      //   currency: "MNT",
      // }).format(value);
      value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return value + " ₮";
    }
  };

  const numFromString = (myStr) => {
    let reg = /[+-]?\d+/g;
    let num = myStr.match(reg);
    return num;
  };

  const onlyNumberFormat = (value) => {
    try {
      // return new Intl.NumberFormat('mn-MN').format(value);
      return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " ₮";
    } catch (e) {
      return value + " ₮";
    }
  };

  const transformToRoute = (productOption) => {
    let route = "";
    try {
      const parts = productOption.provOpt.provision.provCode.split("/");
      parts.forEach((part, key) => {
        route += part && part[0].toUpperCase() + part.slice(1);
      });
    } catch (er) {}
    return route;
  };

  const queryBuilder = (params) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");
  };

  const capitalizeString = (str) => {
    if (!str || str === undefined || str.length <= 1) return str;
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
  };

  return {
    numberFormat,
    numFromString,
    transformToRoute,
    queryBuilder,
    capitalizeString,
    onlyNumberFormat,
  };
};
