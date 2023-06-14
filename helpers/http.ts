import {default as axios} from 'axios';

const http = () => {
  return axios.create({
    baseURL: '',
  });
};

export default http;
