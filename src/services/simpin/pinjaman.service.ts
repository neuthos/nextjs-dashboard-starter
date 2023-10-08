/* eslint-disable func-names */
import type { TabsProps } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';
import type {
  Pinjaman,
  PinjamanJenis,
  PinjamanNasabahDTO,
} from '@/types/pinjaman/pinjaman.type';

const PinjamanService = (function () {
  const Queries = {
    GET_JENIS_SIMPANAN: 'GET_JENIS_SIMPANAN',
    GET_LIST_PINJAMAN: 'GET_LIST_PINJAMAN',
    GET_REKENING_PINJAMAN: 'GET_REKENING_PINJAMAN',
  };

  const getJenisPinjaman = async (): Promise<any> => {
    const path = `http://localhost:9999/pinjamanJenis`;
    const response: any = await SimpinApi.get({ path });

    const data: TabsProps['items'] = response.map((el: PinjamanJenis) => ({
      key: el.id,
      label: el.name,
    }));

    return data;
  };

  const getPinjaman = async (param: {
    page: number;
    size: number;
    status?: number;
    jenis_pinjaman?: string;
    search?: string;
  }): Promise<Pinjaman[]> => {
    const query = objectToQueryString(param);

    const path = `http://localhost:9999/pinjaman?${query}`;
    const response: any = await SimpinApi.get({ path });
    const data: Pinjaman[] = response;
    return data;
  };

  const getRekeningPinjaman = async (param: {
    page: number;
    size: number;
  }): Promise<PinjamanNasabahDTO[]> => {
    const query = objectToQueryString(param);

    const path = `http://localhost:9999/rekeningPinjaman?${query}`;
    const response: any = await SimpinApi.get({ path });
    const data: PinjamanNasabahDTO[] = response;
    return data;
  };

  return {
    Queries,

    getJenisPinjaman,
    getPinjaman,
    getRekeningPinjaman,
  };
})();

export default PinjamanService;
