/* eslint-disable func-names */

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';

const UserService = (function () {
  const Queries = {
    GET_USER_LIST: 'GET_USER_LIST',
    GET_USER_SIMPANAN: 'GET_USER_SIMPANAN',
  };

  const getUserList = async (param: any) => {
    const query = objectToQueryString(param);
    const path = `/user?${query}`;

    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const getUserSimpanan = async () => {
    const path = `/user/list-simpanan`;
    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return null;
  };

  return {
    Queries,
    getUserList,
    getUserSimpanan,
  };
})();

export default UserService;
