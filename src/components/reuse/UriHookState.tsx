import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { EncodeData } from '@/functions/encodeDecode';

const UriHookState = () => {
  const router = useRouter();
  const stateRoute: any = router.query.state || null;
  const [uriData, setUriData] = useState<null | any>(null);

  useEffect(() => {
    const data = EncodeData(stateRoute);
    if (stateRoute && data) setUriData(data);
    else setUriData(null);
  }, [stateRoute]);

  return uriData;
};
export default UriHookState;
