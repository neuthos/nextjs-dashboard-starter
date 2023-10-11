import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import nProgress from 'nprogress';
import React, { useEffect, useState } from 'react';

import PageLoading from '@/components/base/Loading/PageLoader';
import type { AuthorizationContextData } from '@/functions/AuthorizationContexts';
import { AuthorizationContext } from '@/functions/AuthorizationContexts';

export const Authorize: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [roleData, setRoleData] = useState<any>(null);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      nProgress.start();
      setTokenExpired(true);
    },
  });

  const { isLoading } = useQuery(
    ['Health-check'],
    async () => {
      const req = await axios.get(
        `https://stg-api.aviana.id/api/member/health-check`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (req.status === 401) {
        setTokenExpired(true);
        return req;
      }

      return req.data;
    },
    {
      onSuccess: (res: any) => {
        if (res?.success) {
          setRoleData(res?.data || {});
        } else {
          setTokenExpired(true);
        }
      },
      onError: () => {
        setTokenExpired(true);
      },
      enabled: status === 'authenticated',
    }
  );

  function getAccessToken(): string {
    const accessToken = session?.accessToken;
    if (typeof accessToken === 'string') {
      if (accessToken) return accessToken;
    }

    return '';
  }

  useEffect(() => {
    if (tokenExpired) {
      signIn('oidc');
    }
  }, [tokenExpired]);

  if (status === 'authenticated' && !isLoading && roleData) {
    const ctx: AuthorizationContextData = {
      accessToken: getAccessToken(),
      user: {
        ...session.user,
        phone_number: roleData?.phoneNumber || '-',
        roleName: roleData?.roleName || 'Viewer',
      },
      isAuthenticated: true,
    };

    return (
      <AuthorizationContext.Provider value={ctx}>
        {children}
      </AuthorizationContext.Provider>
    );
  }
  return <PageLoading />;
};
