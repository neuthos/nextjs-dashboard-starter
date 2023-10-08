import type { MenuItemCustom } from '@/types/antd/MenuItem.type';

function generateNavItem({
  label,
  key,
  icon,
  children,
  idetifier,
  type,
  parent,
}: {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItemCustom[];
  idetifier?: string;
  type?: string;
  parent?: string;
}): MenuItemCustom {
  return {
    key,
    icon,
    children,
    label,
    idetifier,
    type,
    parent,
  } as MenuItemCustom;
}

export default generateNavItem;
