import { Breadcrumb } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

export type BreadcrumbLocationItem = {
  title: string | React.ReactNode;
  path?: string;
};

type BreadcrumbLocationProps = {
  items: BreadcrumbLocationItem[];
};

export const BreadcrumbLocation = dynamic(
  Promise.resolve(({ items }: BreadcrumbLocationProps) => {
    return (
      <>
        <Breadcrumb
          items={items.map((el) => ({
            title: el.path ? <Link href={el.path}>{el.title}</Link> : el.title,
          }))}
        />
      </>
    );
  })
);
