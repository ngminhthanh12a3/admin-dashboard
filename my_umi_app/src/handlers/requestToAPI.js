// import { message } from 'antd';

export default (API_URL = '', API_Inits = {}) => {
  return fetch(API_URL, API_Inits)
    .then((res) => {
      if (res.json) return res.json();

      return {};
    })
    .catch((error) => console.error(error));
};
