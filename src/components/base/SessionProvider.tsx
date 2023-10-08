'use client';

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import React from 'react';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
};

export default SessionProvider;
