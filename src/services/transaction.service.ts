/* eslint-disable func-names */

import objectToQueryString from '@/functions/objectToQueryString';

import ApiInstance from './index.instance';

const TransactionService = (function () {
  const Queries = {
    LIST_TRANSACTION: 'LIST_TRANSACTION',
    STATISTIC: 'STATISTIC',
  };

  const list = async (payload: any) => {
    const query = objectToQueryString(payload);

    const path = `/transactions?${query}`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const trxStats = async () => {
    const path = `/transactions/stats`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  return {
    Queries,

    trxStats,
    list,
  };
})();

export default TransactionService;
