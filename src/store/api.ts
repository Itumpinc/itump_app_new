import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';

import {__} from '@utils/helpers';
import {setData} from './services/storage';
import {useAppDispatch} from './store';

export const getApiEndpoint = (endpoint: string, localeId?: number) => {
  const apiParams: any[] = [];
  // apiParams.push(`locale_id=${localeId}`);

  if (String(process.env.ENV).trim() === 'development') {
    console.log(
      'URL Start=======>',
      endpoint +
        (apiParams.length > 0
          ? (endpoint.indexOf('?') > -1 ? '&' : '?') + apiParams.join('&')
          : ''),
    );
  }

  return (
    endpoint +
    (apiParams.length > 0
      ? (endpoint.indexOf('?') > -1 ? '&' : '?') + apiParams.join('&')
      : '')
  ); //eslint-disable-line
};

const getToken = (storage: any) => {
  const token = __(storage, 'tokens', 'access', 'token');
  return token ? 'Bearer ' + token : '';
};

let createApiFunction = createApi;

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> = async (
  {url, method = 'GET', data, params},
  api: any,
  extraOptions: any,
) => {
  const {i18n, common} = api.getState();
  const token = getToken(common.storage);
  const endpointUrl = getApiEndpoint(process.env.API_URL + url, i18n.id);
  const dispatch = api.dispatch; // Extract dispatch from api

  const headers = {
    Accept: 'application/json',
    'Content-Type':
      data instanceof FormData ? 'multipart/form-data' : 'application/json',
    ...(token && {Authorization: token}),
  };
  // console.log('token', token, headers);

  try {
    const result = await axios({
      url: endpointUrl,
      method,
      data,
      headers,
    });
    return {data: result.data};
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    const status = err.response?.status;
    if (status === 401) {
      try {
        const result = await axios({
          url: getApiEndpoint(
            process.env.API_URL + '/v1/auth/refresh-tokens',
            i18n.id,
          ),
          method: 'POST',
          data: {
            refresh_token: common.storage.tokens.refresh.token,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        dispatch(setData({key: 'tokens', value: result.data.data}));
        return axiosBaseQuery({url, method, data, params}, api, extraOptions);
      } catch (axiosError) {
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    } else {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  }
};

export const api = createApiFunction({
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});
