import axios from 'axios';
import apiUrls from './apiUrlsConfig';
import { jsonStorage } from './storage';

let storage = jsonStorage.getItem('session');

const instance = axios.create({
  baseURL: apiUrls.baseURL,
  responseType: 'json',
});

if(!!storage.token){
  instance.defaults.headers.common['Authorization'] = 'Bearer '.concat(storage.token);
}

export default instance;
