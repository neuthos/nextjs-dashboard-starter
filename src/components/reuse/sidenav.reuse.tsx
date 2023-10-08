import { Layout, Menu } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import MenuIconFold from 'src/assets/Icon/MenuIconFold.svg';
import MenuIconUnfold from 'src/assets/Icon/MenuIconUnfold.svg';
import SimpinLogo from 'src/assets/LogoCompany.svg';
import useSidenavStore from 'src/stores/sidenav.store';
import useThemeStore from 'src/stores/theme.store';

const { Sider } = Layout;

const Sidebar = () => {
  const router = useRouter();
  const { isDarkTheme } = useThemeStore((state) => state);
  const { allowedNavigation, collapsed, setCollapsed } = useSidenavStore(
    (state) => state
  );

  const handleSwitchNav = ({ key }: any): any => {
    router.push(key);
  };

  return (
    <>
      <Sider
        width={260}
        className="sidebar-custom block overflow-y-auto bg-white px-[16px] py-[24px]"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="">
            <div className="mb-5 flex items-end justify-center gap-x-[20px]">
              {!collapsed && <SimpinLogo />}
              <div className="hidden lg:block">
                {collapsed ? (
                  <MenuIconUnfold onClick={() => setCollapsed(!collapsed)} />
                ) : (
                  <MenuIconFold onClick={() => setCollapsed(!collapsed)} />
                )}
              </div>
            </div>
            <Menu
              theme={isDarkTheme ? 'dark' : 'light'}
              mode="inline"
              items={allowedNavigation || []}
              selectedKeys={[router.pathname]}
              onSelect={handleSwitchNav}
            />
          </div>
        </div>
      </Sider>
    </>
  );
};

export default dynamic(() => Promise.resolve(Sidebar));
