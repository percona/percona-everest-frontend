import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const BASE_URL = '/v1/';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const MAX_ERROR_MESSAGE_LENGTH = 120;

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      let message = DEFAULT_ERROR_MESSAGE;

      if (error.response.data && error.response.data.message) {
        if (error.response.data.message.length > MAX_ERROR_MESSAGE_LENGTH) {
          message = `${error.response.data.message
            .trim()
            .substring(0, MAX_ERROR_MESSAGE_LENGTH)}...`;
        } else {
          message = error.response.data.message.trim();
        }
      }

      enqueueSnackbar(message, {
        variant: 'error',
      });
    }

    return Promise.reject(error);
  }
);
