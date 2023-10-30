/* eslint-disable no-useless-concat */
import { Space, Tag, Timeline, Typography } from 'antd';
import dayjs from 'dayjs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { HeadCustom } from '@/components/reuse/header.reuse';
import UriHookState from '@/components/reuse/UriHookState';
import snakeToCapitalized from '@/functions/snakeToCapitalized';

const LogHistoryDetail = () => {
  const uriData = UriHookState();
  const data = uriData?.data;

  const tagObj: any = {
    REQUEST: {
      color: 'gray',
      label: 'Permintaan',
    },
    SUCCESS: {
      color: 'green',
      label: 'Berhasil',
    },
    ERROR: {
      color: 'volcano',
      label: 'gagal',
    },
  };

  const items = data?.logs?.map((el: any) => ({
    children: (
      <div>
        <Space>
          <Tag color={tagObj[el.status_log]?.color}>
            {tagObj[el.status_log]?.label}
          </Tag>
          <Typography.Title className="mb-0" level={4}>
            {el.title}
          </Typography.Title>
        </Space>

        <p className="mb-3 italic">
          {snakeToCapitalized(el.label_log)} -{' '}
          {dayjs(el.created_at).format('DD MMMM YYYY HH:mm:ss')}
        </p>

        <SyntaxHighlighter wrapLongLines={true} language="json">
          {JSON.stringify(el.log)}
        </SyntaxHighlighter>
      </div>
    ),
  }));

  if (!data) return <></>;
  return (
    <>
      <HeadCustom
        title={data?.reference_number}
        breadcrumbItems={[
          { title: 'Sales & marketing' },
          { title: 'Pengaturan' },
          { title: 'Riwayat Log' },
        ]}
      />

      <section className="p-5">
        <Timeline items={items} />
      </section>
    </>
  );
};

export default LogHistoryDetail;
