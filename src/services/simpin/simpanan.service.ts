/* eslint-disable func-names */

import { message } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';

const SimpananService = (function () {
  const Queries = {
    GET_LIST_SIMPANAN: 'GET_LIST_SIMPANAN',
    GET_DETAIL_SIMPANAN: 'GET_DETAIL_SIMPANAN',
    GET_TRANSAKSI_SIMPANAN: 'GET_TRANSAKSI_SIMPANAN',
    GET_NASABAH_SIMPANAN: 'GET_NASABAH_SIMPANAN',
  };

  const getListSimpanan = async (param: {
    page: number;
    size: number;
    status?: number;
    jenis_simpanan?: string;
    search?: string;
  }) => {
    const query = objectToQueryString(param);

    const path = `/simpanan?${query}`;

    const response = await SimpinApi.get({ path });

    if (response.success) return response.data;
    return [];
  };

  const addSimpanan = async (body: any) => {
    const path = '/simpanan';

    const response = await SimpinApi.post({ path, body });
    if (!response.success) {
      message.error(response.msg || 'Internal Server Error');
      return null;
    }
    return response as any;
  };

  const updateSimpanan = async ({ simpananId, body }: any) => {
    const path = `/simpanan/${simpananId}`;

    const response = await SimpinApi.patch({ path, body });
    if (!response.success) {
      message.error(response.msg || 'Internal Server Error');
      return null;
    }
    return response as any;
  };

  const updateStatusSimpanan = async ({ simpananId, status }: any) => {
    const query = objectToQueryString({ status });

    const path = `/simpanan/${simpananId}/status?${query}`;
    const response = await SimpinApi.patch({ path });
    if (!response.success) {
      message.error(response.msg || 'Internal Server Error');
      return null;
    }
    return response as any;
  };

  const getSimpananDetail = async (simpananId: string) => {
    const path = `/simpanan/${simpananId}`;
    const response = await SimpinApi.get({ path });

    if (response.success) return response.data;
    return null;
  };

  return {
    Queries,

    getListSimpanan,
    getSimpananDetail,

    addSimpanan,
    updateSimpanan,
    updateStatusSimpanan,
  };
})();

export default SimpananService;
