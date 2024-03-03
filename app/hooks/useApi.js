import { useContext, useState } from "react";
import AuthContext from "../auth/context";

export default (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { status, setStatus, activeTimer, setActiveTimer } = useContext(
    AuthContext
  );

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    setError(!response.ok);
    setData(response.data);
    setStatus(response.status);

    setActiveTimer(7200000); // Session Time Const

    return response.data;
  };

  return { request, data, error, loading };
};
