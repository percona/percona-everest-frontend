import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const BASE_URL = '/v1/';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const MAX_ERROR_MESSAGE_LENGTH = 120;

export const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      let message = DEFAULT_ERROR_MESSAGE;
    
      if (error.response.data && error.response.data.message) {
        message = `${error.response.data.message.trim().substring(0, MAX_ERROR_MESSAGE_LENGTH)}...`;
      }

      enqueueSnackbar(message, {
        variant: 'error'
      });
    }

    return Promise.reject(error);
  }
 );