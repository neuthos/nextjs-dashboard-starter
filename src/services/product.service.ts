/* eslint-disable func-names */

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
    const path = `/products?${query}`;

    const response = await ApiInstance.get({ path });
    if (response.success) return response.data;
    return null;
  };

  return {
    Queries,
    productCategoriesList,
    productBrandList,
    productList,
  };
})();

export default ProductService;
