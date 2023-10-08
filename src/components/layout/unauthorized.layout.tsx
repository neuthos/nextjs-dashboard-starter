import React from 'react';

import { Authorize } from '@/components/Authorize';

const UnauthorizedLayout = ({ children }: { children: React.ReactElement }) => {
  return <>{children}</>;
};

const WithAuthorizedBlankLayout = (page: React.ReactElement) => (
  <Authorize>
    <UnauthorizedLayout>{page}</UnauthorizedLayout>
  </Authorize>
);

export default WithAuthorizedBlankLayout;
