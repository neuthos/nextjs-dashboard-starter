import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';

export const FooterDefault = dynamic(
  Promise.resolve(() => {
    return (
      <>
        <Layout.Footer style={{ textAlign: 'center' }}>
          IRSX ©2023 Created by Galang Ardian
        </Layout.Footer>
      </>
    );
  })
);
