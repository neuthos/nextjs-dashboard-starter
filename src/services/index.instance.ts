/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getSession, signIn } from 'next-auth/react';

const ApiInterface = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/simpin`,
});

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const pin = Cookies.get('pin');
  if (pin) {
    config.headers.pin = pin;
    Cookies.set('p_tr', Math.random().toString());
  }

  const session = await getSession();
  config.headers.Authorization = `Bearer ${session?.accessToken}`;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response) return response.data;
  return response;
};

const onResponseError = (error: AxiosError) => {
  const responseError = error.response;

  if (responseError) {
    if (responseError.status === 401) {
      signIn('oidc');
      return {
        success: false,
        status: 500,
        data: 'Unauthorized',
      };
    }

    return responseError.data;
  }

  return {
    success: false,
    status: 500,
    message: 'Internal Server Error',
  };
};

ApiInterface.interceptors.request.use(onRequest, onRequestError);
ApiInterface.interceptors.response.use(onResponse, onResponseError);

type T = {
  path: string;
  query?: any;
  token?: string;
  body?: null | { [key: string]: any } | undefined;
};

type DefaultAxiosResponse = {
  success: boolean;
  data: any;
  error?: {
    message: string;
    code: number;
  };
};

const ApiInstance = (function () {
  const get = async (payload: T): Promise<DefaultAxiosResponse> => {
    return ApiInterface.get(payload.path, {});
  };

  const post = async (payload: T): Promise<any> => {
    return ApiInterface.post(payload.path, payload.body);
  };

  const put = async (payload: T): Promise<any> => {
    return ApiInterface.put(payload.path, payload.body);
  };

  const patch = async (payload: T): Promise<any> => {
    return ApiInterface.patch(payload.path, payload.body);
  };

  const del = async (payload: T): Promise<any> => {
    return ApiInterface.delete(payload.path);
  };

  return { post, get, put, patch, del };
})();

export default ApiInstance;
