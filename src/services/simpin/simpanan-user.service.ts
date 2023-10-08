/* eslint-disable func-names */

import { message } from 'antd';
import dayjs from 'dayjs';

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';

const SimpananUser = (function () {
  const Queries = {
    GET_NASABAH_SIMPANAN: 'GET_NASABAH_SIMPANAN',
  };

  const getNasabahSimpanan = async (param: any) => {
    const query = objectToQueryString(param);
    const path = `/simpanan-user?${query}`;

    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const createRekening = async (body: {
    user_id: string;
    simpanan_id: string;
  }) => {
    const path = '/simpanan-user';
    const response = await SimpinApi.post({
      path,
      body: {
        ...body,
        no_rekening: null,
        start_date: dayjs().format('YYYY-MM-DD'),
        pembayaran_simpanan_pokok: 'false',
      },
    });

    if (response.success) {
      return response;
    }

    message.error(response.msg);
    return null;
  };

  return {
    Queries,
    getNasabahSimpanan,

    createRekening,
  };
})();

export default SimpananUser;
