/* eslint-disable react/display-name */

import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import type { Page } from 'src/types/page.type';

import ListHistoryTransaction from '@/components/parts/sales-marketing/history-transaction/ListHistoryTransaction';

const HistoryTransactionPage: Page = () => {
  return <ListHistoryTransaction />;
};

HistoryTransactionPage.layout = WithDashboardLayout;
export default HistoryTransactionPage;
