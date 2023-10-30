/* eslint-disable react/display-name */
import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import type { Page } from 'src/types/page.type';

import LogHistoryDetail from '@/components/parts/sales-marketing/setting/LogHistoryDetail';
import PageSetting from '@/components/parts/sales-marketing/setting/PageSetting';
import UriHookState from '@/components/reuse/UriHookState';

const SettingPage: Page = () => {
  const uriData = UriHookState();

  if (uriData?.page === 'log-history-detail') return <LogHistoryDetail />;

  return <PageSetting />;
};

SettingPage.layout = WithDashboardLayout;
export default SettingPage;
