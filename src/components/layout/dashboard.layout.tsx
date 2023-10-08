// @ts-nocheck
import { ConfigProvider, Layout, Skeleton, theme } from 'antd';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Authorize } from 'src/components/Authorize';

import { useAuthorizationContext } from '@/functions/AuthorizationContexts';
import useSidenavStore from '@/stores/sidenav.store';

import MobileDrawer from '../reuse/mobileDrawer.reuse';
import Sidebar from '../reuse/sidenav.reuse';

const SicsNavbar: any = dynamic(() => import('sics_home/navbar'), {
  ssr: false,
});

const { Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const [navLoading, setNavLoading] = useState(true);
  const session = useAuthorizationContext();

  const { arrOfAllowedNavigation, mappingAllowedUserModule } = useSidenavStore(
    (state) => state
  );

  const handleAllowedPages = async () => {
    if (arrOfAllowedNavigation) {
      const SET_ALLOWED_NAVBAR = new Set([...arrOfAllowedNavigation]);
      const isAllowed = SET_ALLOWED_NAVBAR.has(router.pathname);
      if (!isAllowed && arrOfAllowedNavigation[0]) {
        router.replace(arrOfAllowedNavigation[0]);
      } else if (!isAllowed && !arrOfAllowedNavigation[0]) {
        router.push('/unauthorized');
      }
    }
  };

  useEffect(() => {
    if (router.isReady && session.isAuthenticated) handleAllowedPages();
  }, [router.isReady, arrOfAllowedNavigation, session]);

  useEffect(() => {
    if (session) mappingAllowedUserModule(session.user.roles);
  }, [session]);

  useEffect(() => {
    // REMOVE PIN TRIGGER
    Cookies.remove('pin');
  }, [Cookies.get('p_tr')]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="fixed z-20 max-h-[46px] w-full">
        {navLoading && <Skeleton.Button className="h-[46px] w-full" active />}
        <SicsNavbar
          callbackRender={() => setNavLoading(false)}
          loggedInName={session?.user?.given_name}
          loggedInRole={'Admin Finance Member'}
          loggedInPicture={`https://api.dicebear.com/6.x/initials/svg?seed=${session?.user?.given_name}`}
          loggedInAllowedModules={session?.user?.resource_access}
          logoutfunction={() => {
            signOut({
              callbackUrl: '/api/end-session',
            });
          }}
        />
      </div>

      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: token.colorBgContainer,
            },
            Menu: {
              itemBg: token.colorBgContainer,
              horizontalItemSelectedBg: token.colorPrimary,
              itemSelectedBg: token.colorPrimary,
              itemSelectedColor: token.colorPrimary,
              itemColor: '#333333',
              subMenuItemBg: token.colorBgContainer,
              activeBarBorderWidth: -1,
            },
          },
        }}
      >
        <Layout className={`h-screen pt-[44px]`}>
          <Layout>
            <Sidebar />
            <MobileDrawer />
            <Layout>
              <Content className="h-full overflow-y-auto bg-[#ffffff]">
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

const WithDashboardLayout = (page: React.ReactElement) => {
  return (
    <Authorize>
      <DashboardLayout>{page}</DashboardLayout>
    </Authorize>
  );
};

export default WithDashboardLayout;
