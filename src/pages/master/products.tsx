/* eslint-disable react/display-name */
import { Button } from 'antd';
import React from 'react';
import WithDashboardLayout from 'src/components/layout/dashboard.layout';
import { HeadCustom } from 'src/components/reuse/header.reuse';
import type { Page } from 'src/types/page.type';

const FilePage: Page = () => {
  return (
    <>
      <HeadCustom
        title={'Child 2'}
        breadcrumbItems={[
          { title: 'Home', path: '/dashboard' },
          { title: 'Child 2', path: '/dashboard' },
        ]}
        buttonActions={[
          <Button key={0} type="primary">
            Download
          </Button>,
        ]}
      />
    </>
  );
};

FilePage.layout = WithDashboardLayout;
export default FilePage;
