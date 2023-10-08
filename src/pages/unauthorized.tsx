// @ts-nocheck
import { Button, Result, Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { useAuthorizationContext } from '@/functions/AuthorizationContexts';

const SicsNavbar: any = dynamic(() => import('sics_home/navbar'), {
  ssr: false,
});

const UnauthorizedPage = () => {
  const session = useAuthorizationContext();

  const [navLoading, setNavLoading] = useState(true);
  return (
    <>
      <div className="fixed z-20 max-h-[46px] w-full">
        {navLoading && <Skeleton.Button className="h-[46px] w-full" active />}
        <SicsNavbar
          callbackRender={() => setNavLoading(false)}
          loggedInName={session?.user?.given_name}
          loggedInRole={'Admin Finance'}
          loggedInPicture={`https://api.dicebear.com/6.x/initials/svg?seed=${session?.user?.given_name}`}
          loggedInAllowedModules={session?.user?.resource_access}
          logoutfunction={() => {
            signOut({
              callbackUrl: '/api/end-session',
            });
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center p-[46px]">
        <Result
          status="500"
          title="Unauthorized"
          subTitle="Akunmu tidak memiliki akses apapun di module ini"
        />

        <Button
          onClick={() => {
            signOut({
              callbackUrl: '/api/end-session',
            });
          }}
          type="primary"
          danger
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default UnauthorizedPage;
