import clientLogin from "./clientLogin";

const getInfo = (cookie) => {
  return clientLogin.get('/api/info', {headers: {'Cookie': cookie}});
}

export default {
  getInfo
};
