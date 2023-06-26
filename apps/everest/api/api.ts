import axios from 'axios';

const BASE_URL = '/v1/';

export const api = axios.create({
  baseURL: BASE_URL
});
