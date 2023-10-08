import { notification } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import nProgress from 'nprogress';
import React, { useEffect } from 'react';

export const SessionErrorHandler: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      notification.warning({
        message: 'Login Required',
        description: 'Your session has ended. Redirecting to login page...',
      });
      nProgress.start();
      signIn('oidc');
    }
  }, [session]);

  return <>{children}</>;
};
