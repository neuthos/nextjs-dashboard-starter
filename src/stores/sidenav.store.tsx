import { BarChartOutlined } from '@ant-design/icons';
import React from 'react';
import { create } from 'zustand';

import generateNavItem from '@/functions/generateNavItem';
import type {
  MenuItemCustom,
  MenuItemGroupCustom,
} from '@/types/antd/MenuItem.type';

export interface GroupOfNavigation {
  [key: string]: MenuItemGroupCustom;
}

interface SidenavState {
  allNavigation: MenuItemCustom[];
  allowedNavigation: MenuItemGroupCustom[] | null;
  arrOfAllowedNavigation: string[] | null;
  setNavigation: ({
    allowedNavigation,
    arrOfAllowedNavigation,
  }: {
    allowedNavigation: MenuItemGroupCustom[];
    arrOfAllowedNavigation: string[];
  }) => void;
  mappingAllowedUserModule: (userRole: { [key: string]: boolean }) => void;
  resetGroupOfNavigation: () => void;
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const initialState = {};

const useSidenavStore = create<SidenavState>()((set) => ({
  allNavigation: [
    generateNavItem({
      label: 'Overview',
      key: '/',
      icon: <BarChartOutlined />,
      idetifier: 'temp',
    }),
    generateNavItem({
      label: 'Data Master',
      key: 'DATA_MASTER',
      icon: <BarChartOutlined />,
      idetifier: 'temp',
      children: [
        generateNavItem({
          label: 'Supplier',
          key: '/master/supplier',
          idetifier: 'temp',
        }),
        generateNavItem({
          label: 'Produk Saya',
          key: '/master/products',
          idetifier: 'temp',
        }),
      ],
    }),
    generateNavItem({
      label: 'Sales & Marketing',
      key: 'SALES_MARKETING',
      icon: <BarChartOutlined />,
      idetifier: 'temp',
      children: [
        generateNavItem({
          label: 'Histori Transaksi',
          key: '/sales-marketing/history-transaksi',
          idetifier: 'temp',
        }),
        generateNavItem({
          label: 'Affiliate Saya',
          key: '/sales-marketing/affiliate',
          idetifier: 'temp',
        }),
      ],
    }),
  ],

  arrOfAllowedNavigation: null,
  allowedNavigation: null,
  setNavigation: ({ allowedNavigation, arrOfAllowedNavigation }) =>
    set(() => ({ allowedNavigation, arrOfAllowedNavigation })),

  openDrawer: false,
  setOpenDrawer: (val) => set(() => ({ openDrawer: val })),

  collapsed: false,
  setCollapsed: (val) => set(() => ({ collapsed: val })),

  resetGroupOfNavigation: () =>
    set({
      ...initialState,
    }),

  mappingAllowedUserModule: (userRole) =>
    set((state) => {
      const navigationInitialized = !!(
        state.allowedNavigation && state.arrOfAllowedNavigation
      );

      if (navigationInitialized || !userRole) return state;

      const arrOfNavigation: string[] = [];
      const tempAllowedNavigation: MenuItemCustom[] = [];

      state.allNavigation.forEach((nav: MenuItemCustom) => {
        if (nav.children) {
          const navAndChildTemp: MenuItemCustom = { ...nav, children: [] };
          nav.children.forEach((navChild: MenuItemCustom) => {
            if (userRole[navChild.idetifier]) {
              navAndChildTemp.children?.push(navChild);
              arrOfNavigation.push(navChild.key);
            }
          });

          if (navAndChildTemp.children && navAndChildTemp.children.length > 0) {
            tempAllowedNavigation.push(navAndChildTemp);
          }
        } else if (userRole[nav.idetifier]) {
          tempAllowedNavigation.push(nav);
          arrOfNavigation.push(nav.key);
        }
      });

      return {
        ...state,
        allowedNavigation: tempAllowedNavigation,
        arrOfAllowedNavigation: arrOfNavigation,
      } as SidenavState;
    }),
}));

export default useSidenavStore;
