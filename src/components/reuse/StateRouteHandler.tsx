import Router from 'next/router';

import { DecodeData } from '@/functions/encodeDecode';

const routeState = ({ page, data }: { page: string; data: any }) => {
  const state = {
    page,
    data,
  };

  Router.push({
    pathname: Router.pathname,
    query: {
      state: DecodeData(state),
    },
  });
};

export default routeState;
