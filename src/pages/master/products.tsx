/* eslint-disable react/display-name */
import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import type { Page } from 'src/types/page.type';

import ListProductMaster from '@/components/parts/master/products/ListProductMaster';

const ProductMaster: Page = () => {
  return <ListProductMaster />;
};

ProductMaster.layout = WithDashboardLayout;
export default ProductMaster;
