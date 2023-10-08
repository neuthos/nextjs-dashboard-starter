export type MenuItemCustom = {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItemCustom[];
  idetifier: string;
  type?: string;
  parent: string;
};

export type MenuItemGroupCustom = {
  label: React.ReactNode;
  key: string;
  children: MenuItemCustom[];
  type: string;
};
