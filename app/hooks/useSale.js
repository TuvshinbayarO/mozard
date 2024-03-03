import { useContext } from "react";
import SaleContext from "../services/saleContext";

export default () => {
  const { sale, setSale } = useContext(SaleContext);

  const setParams = (state) => (value) => {
    setSale({
      ...sale,
      [state]: value,
    });
  };
  const delParams = (name) => {
    const tmpParam = { ...sale };
    if (name in tmpParam) delete tmpParam[name];
    setSale(tmpParam);
  };
  const resetParams = () => setSale({});
  return { params: sale, setParams, delParams, resetParams };
};
