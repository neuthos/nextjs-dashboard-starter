/* eslint-disable @typescript-eslint/no-explicit-any */
export type DefaultApiResponseType = {
  success: boolean;
  status: number;
  msg?: string;
  data: any;
  paginate?: any;
};
export interface PaginationQueryType {
  limit: number | undefined;
  page: number | undefined;
  search: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  size?: number | undefined;
  sort?: string;
  periodGuid?: string;
  branchGuid?: string;
  memberName?: string;
  memberTypeGuid?: string;
}

export interface ResponseKalenderCutOff {
  createdAt: string | null;
  createdBy: string | null;
  date: string;
  guid: string;
  koperasiGuid: string;
  status: number;
  time: string;
  updatedAt: string | null;
}

export interface TypeColumnKalenderCutOff {
  periode: string | null;
  datetime: string | null;
  created_by: string | null;
}

export interface ResponseAnggotaAllowance {
  email?: string;
  identity?: string;
  limitAllowance?: number;
  name?: string;
  status?: number;
  usage?: number;
}

export interface PayloadUpdateAnggotaAllowance {
  body: any;
  id: string;
}
