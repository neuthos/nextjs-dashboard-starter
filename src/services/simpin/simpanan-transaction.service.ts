/* eslint-disable func-names */
import { message } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';

const SimpananTransaction = (function () {
  const Queries = {
    GET_TRANSACTION: 'GET_TRANSACTION',
  };

  const listTransaction = async (param: any) => {
    const query = objectToQueryString(param);
    const path = `/simpanan-transaction?${query}`;

    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const createTransaction = async (body: any) => {
    const path = `/simpanan-transaction`;
    const response = await SimpinApi.post({ path, body });

    if (response.success) return response;

    message.error(response.msg);
    return null;
  };

  return {
    Queries,
    listTransaction,

    createTransaction,
  };
})();

export default SimpananTransaction;
