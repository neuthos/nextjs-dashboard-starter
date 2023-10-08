import { Skeleton, Typography } from 'antd';
import Head from 'next/head';

const PageLoading = () => {
  return (
    <>
      <Head>
        <title>Sics+</title>
      </Head>

      <div className="flex h-screen w-screen flex-col items-center justify-center p-5">
        <Typography.Title level={4} className="text-center">
          Memuat Halaman mu...
        </Typography.Title>
        <Skeleton.Button className="w-[300px]" active={true} />
      </div>
    </>
  );
};

export default PageLoading;
