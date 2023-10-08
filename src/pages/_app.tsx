import 'tailwindcss/tailwind.css';
import 'src/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Router } from 'next/router';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';
import type { ReactElement, ReactNode } from 'react';
import React, { useEffect } from 'react';
import useThemeStore from 'src/stores/theme.store';

import { SessionErrorHandler } from '@/components/SessionErrorHandler';
import ProductConfig from '@/constants/product.constant';

config.autoAddCss = false;

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>): JSX.Element {
  const getLayout = Component.layout || ((page: any) => page);

  const { isDarkTheme } = useThemeStore((state) => state);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-color',
      isDarkTheme ? '#000' : '#fff'
    );
  }, [isDarkTheme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: [
              isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
              theme.compactAlgorithm,
            ],
            token: {
              colorPrimary: ProductConfig.color.colorPrimary,
              colorSuccess: '#00990a',
              colorWarning: '#f59c1a',
              colorError: '#e50500',
              colorInfo: '#49b6d6',
              wireframe: false,
              borderRadius: 8,
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans ,sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
            },
            components: {
              Input: {
                controlHeight: 44,
              },
              InputNumber: {
                controlHeight: 44,
              },
              Table: {
                colorTextHeading: '#2D353C',
                fontSize: 12,
                fontWeightStrong: 700,
              },
              Button: {
                controlHeight: 44,
                // fontSize: 16,
                // fontWeightStrong: 700,
              },
            },
          }}
        >
          <SessionProvider
            refetchInterval={120}
            refetchWhenOffline={false}
            refetchOnWindowFocus={false}
            session={pageProps.session}
          >
            <SessionErrorHandler>
              {getLayout(<Component {...pageProps} />)}
            </SessionErrorHandler>
          </SessionProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}

NProgress.configure({
  showSpinner: false,
});

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default dynamic(() => Promise.resolve(App), { ssr: false });
