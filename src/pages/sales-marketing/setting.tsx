/* eslint-disable react/display-name */
import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import type { Page } from 'src/types/page.type';

import PageSetting from '@/components/parts/sales-marketing/setting/PageSetting';

const SettingPage: Page = () => {
  return <PageSetting />;
};

SettingPage.layout = WithDashboardLayout;
export default SettingPage;
