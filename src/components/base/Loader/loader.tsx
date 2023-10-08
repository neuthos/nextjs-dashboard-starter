import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

interface LoaderCustomProps {
  classname?: string;
}

const LoaderCustom = ({ classname }: LoaderCustomProps) => {
  const antIcon = (
    <LoadingOutlined className={`text-[24px] ${classname}`} spin />
  );
  return <Spin indicator={antIcon} />;
};
export default LoaderCustom;
