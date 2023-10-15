/* eslint-disable func-names */

import { message } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';

import ApiInstance from './index.instance';

const SupplierService = (function () {
  const Queries = {
    LIST_SUPPLIER: 'LIST_SUPPLIER',
    FEE: 'FEE',
  };

  const list = async (param: any) => {
    const query = objectToQueryString(param);
    const path = `/suppliers?${query}`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const create = async (body: {
    name: string;
    secretkey: string;
    publickey: string;
    ipserver: string;
  }) => {
    const path = '/suppliers';

    const response = await ApiInstance.post({ path, body });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const update = async (payload: {
    uuid: string;
    body: {
      name?: string;
      secretkey?: string;
      publickey?: string;
      ipserver?: string;
    };
  }) => {
    const path = `/suppliers/${payload.uuid}`;

    const response = await ApiInstance.put({ path, body: payload.body });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const getFee = async () => {
    const path = `/company/fee`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  return {
    Queries,

    list,
    create,
    update,
    getFee,
  };
})();

export default SupplierService;
