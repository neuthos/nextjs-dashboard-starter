import {
  ConfigProvider,
  Drawer,
  Menu,
  Skeleton,
  theme,
  Typography,
} from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AntCollabLogo from 'src/assets/antcollab.png';
import useSidenavStore from 'src/stores/sidenav.store';
import useThemeStore from 'src/stores/theme.store';
import { useStore } from 'zustand';

const MobileDrawer = () => {
  const { token } = theme.useToken();
  const { openDrawer, setOpenDrawer } = useSidenavStore((state) => state);
  const { isDarkTheme } = useThemeStore((state) => state);
  const { allowedNavigation } = useStore(useSidenavStore);

  return (
    <>
      <Drawer
        placement="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                colorItemBg: isDarkTheme ? '#1f1f1f' : '#fafafa',
                colorSubItemBg: token.colorBgContainer,
                colorActiveBarBorderSize: 0,
              },
            },
          }}
        >
          <div className="my-5 flex h-[30px] w-full items-center justify-center gap-x-4">
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

          {!allowedNavigation ? (
            <>
              {[1, 2, 3, 4, 5].map((key) => (
                <div
                  key={key}
                  className="mb-5 flex w-full items-center justify-center px-5"
                >
                  <Skeleton.Button className="w-full" active />
                </div>
              ))}
            </>
          ) : (
            <Menu mode="vertical" items={allowedNavigation} />
          )}
        </ConfigProvider>
      </Drawer>
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileDrawer));
