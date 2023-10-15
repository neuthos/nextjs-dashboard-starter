/* eslint-disable func-names */

import { message } from 'antd';

import objectToQueryString from '@/functions/objectToQueryString';

import ApiInstance from './index.instance';

const ProductService = (function () {
  const Queries = {
    PRODUCT_CATEGORIES_LIST: 'PRODUCT_CATEGORIES_LIST',
    PRODUCT_BRANDS_LIST: 'PRODUCT_BRANDS_LIST',
    PRODUCTS: 'PRODUCTS',
  };

  const productCategoriesList = async () => {
    const path = `/product-categories`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const productBrandList = async (productCategoryId: string) => {
    const path = `/product-brands/${productCategoryId}`;
    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const productList = async (param: any) => {
    const query = objectToQueryString(param);
    const path = `/product-companies?${query}`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  const updateStatus = async (payload: {
    status: string;
    productCompanyIds: string[];
  }) => {
    const path = `/product-companies/update-status`;

    const response = await ApiInstance.patch({ path, body: payload });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateMargin = async (payload: {
    margin: string;
    productCompanyIds: string[];
  }) => {
    const path = `/product-companies/update-margin`;

    const response = await ApiInstance.patch({ path, body: payload });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateMarginByCategory = async (payload: {
    categoryId: string;
    margin: string;
  }) => {
    const path = `/product-companies/update-margin-by-category/${payload.categoryId}`;

    const response = await ApiInstance.patch({
      path,
      body: {
        margin: payload.margin,
      },
    });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateMarginByBrand = async (payload: {
    brandId: string;
    margin: string;
  }) => {
    const path = `/product-companies/update-margin-by-brand/${payload.brandId}`;

    const response = await ApiInstance.patch({
      path,
      body: {
        margin: payload.margin,
      },
    });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateMarginAllProducts = async (payload: { margin: string }) => {
    const path = `/product-companies/update-margin/all`;

    const response = await ApiInstance.patch({
      path,
      body: {
        margin: payload.margin,
      },
    });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateSupplier = async (payload: {
    supplierId: string;
    buyPrice: number;
    productCompanyIds: string[];
  }) => {
    const path = `/product-companies/update-supplier`;

    const response = await ApiInstance.patch({ path, body: payload });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  const updateDefaultMargin = async (payload: { defaultMargin: number }) => {
    const path = `/company/default-margin`;

    const response = await ApiInstance.patch({
      path,
      body: {
        defaultMargin: payload.defaultMargin,
      },
    });

    if (response.success) return response;

    message.error(response?.msg || 'Internal Server Error');
    return null;
  };

  return {
    Queries,
    productCategoriesList,
    productBrandList,
    productList,
    updateStatus,
    updateMargin,
    updateMarginByCategory,
    updateSupplier,
    updateMarginByBrand,
    updateMarginAllProducts,
    updateDefaultMargin,
  };
})();

export default ProductService;
