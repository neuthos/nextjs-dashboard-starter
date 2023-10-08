import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  faMoon,
  faRightFromBracket,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout, Switch, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import React from 'react';
import AntCollabLogo from 'src/assets/antcollab.png';
import useSidenavStore from 'src/stores/sidenav.store';
import useThemeStore from 'src/stores/theme.store';

const { Header } = Layout;

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: (
      <div
        className="flex items-center gap-x-2"
        onClick={() => {
          signOut({ callbackUrl: 'http://localhost:3000/login' });
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} color={'#DC4446'} />
        <Typography.Text type="danger">Logout</Typography.Text>
      </div>
    ),
  },
];

export const Navbar = dynamic(
  Promise.resolve(() => {
    const { setOpenDrawer, setCollapsed, collapsed } = useSidenavStore(
      (state) => state
    );

    const { setIsDarkTheme } = useThemeStore((state) => state);

    return (
      <>
        <Header className="flex items-center justify-between px-0">
          <div className="flex h-full items-center gap-x-5">
            <div className="flex h-full w-[200px] items-center justify-center gap-x-4">
              <Image
                src={AntCollabLogo}
                alt={'ant collab logo'}
                width={30}
                height={30}
              />
              <Typography.Title level={5} className="m-0 mt-2">
                AntCollab
              </Typography.Title>
            </div>

            <div className="hidden lg:block">
              {collapsed ? (
                <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
              ) : (
                <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
              )}
            </div>

            <div className="lg:hidden">
              {collapsed ? (
                <MenuUnfoldOutlined onClick={() => setOpenDrawer(!collapsed)} />
              ) : (
                <MenuFoldOutlined onClick={() => setOpenDrawer(!collapsed)} />
              )}
            </div>
          </div>

          <div className="flex h-full items-center gap-x-5 pr-5">
            <Switch
              checkedChildren={<FontAwesomeIcon icon={faMoon} />}
              unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
              defaultChecked
              onChange={setIsDarkTheme}
            />

            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <Avatar className="cursor-pointer" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
      </>
    );
  })
);
