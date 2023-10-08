/* eslint-disable func-names */
import { message } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';
import SimpinApi from '@/services/index.instance';

const FormulaService = (function () {
  const Queries = {
    GET_FORMULA: 'GET_FORMULA',
    GET_VARIABLES: 'GET_VARIABLES',
    GET_FORMULA_LOGS: 'GET_FORMULA_LOGS',
  };

  const getFormula = async (param: {
    page: number;
    limit: number;
    status?: number;
    category?: string;
  }) => {
    const query = objectToQueryString(param);
    const path = `/formulas?${query}`;
    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return {};
  };

  const getFormulaLogs = async (body: { formulaId: number }) => {
    const path = `/formulas/logs/${body.formulaId}`;
    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return [];
  };

  const simulate = async (body: {
    formulaCode: string;
    formulaValue: { [key: string]: number };
  }) => {
    const path = '/formulas/simulate';
    const response = await SimpinApi.patch({ path, body });
    if (response.success) return response.data;
    message.error(response?.msg || 'Simulasi error');
    return null;
  };

  const getVariables = async () => {
    const path = '/formulas/variables';
    const response = await SimpinApi.get({ path });
    if (response.success) return response.data;
    return [];
  };

  const addFormula = async (body: {
    name: string;
    category: string;
    formula: string;
  }) => {
    const path = '/formulas';

    const response = await SimpinApi.post({ path, body });

    if (response.success) return response.msg;

    message.error(response.error?.message || 'Internal Server Error');
    return null;
  };

  const updateFormula = async (body: {
    formulaId: string;
    name: string;
    category: string;
    formula: string;
  }) => {
    const path = `/formulas/${body.formulaId}`;

    const response = await SimpinApi.put({
      path,
      body: {
        name: body.name,
        category: body.category,
        formula: body.formula,
      },
    });

    if (response.success) return response.msg;

    message.error(response.error?.message || 'Internal Server Error');
    return null;
  };

  const updateReleaseFormula = async (body: {
    formulaId: string;
    updateStatusTo: number;
    status: number;
  }) => {
    if (body.status === 1 && body.updateStatusTo === 0) {
      // TODO CHECKING
      message.info('Tidak bisa mengubah status formula yang suda rilis');
      return null;
    }

    const path = `/formulas/${body.formulaId}`;
    const response = await SimpinApi.patch({
      path,
      body: {
        updateCode: body.updateStatusTo,
      },
    });

    if (response.success) return response.msg;
    message.error(response.error?.message || 'Internal Server Error');
    return null;
  };

  const deleteFormula = async (body: { formulaId: string }) => {
    const path = `/formulas/${body.formulaId}`;
    const response = await SimpinApi.del({
      path,
    });

    if (response.success) return response.msg;
    message.error(response.error?.message || 'Internal Server Error');
    return null;
  };

  return {
    Queries,

    getFormula,
    getVariables,
    getFormulaLogs,

    addFormula,
    updateFormula,
    updateReleaseFormula,
    deleteFormula,

    simulate,
  };
})();

export default FormulaService;
