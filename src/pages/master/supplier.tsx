/* eslint-disable react/display-name */
import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import type { Page } from 'src/types/page.type';

import FormSupplier from '@/components/parts/master/supplier/FormSupplier';
import ListSupplier from '@/components/parts/master/supplier/ListSupplier';
import UriHookState from '@/components/reuse/UriHookState';

const SupplierPage: Page = () => {
  const uriData = UriHookState();

  if (uriData?.page === 'add-supplier') return <FormSupplier />;

  return <ListSupplier />;
};

SupplierPage.layout = WithDashboardLayout;
export default SupplierPage;
