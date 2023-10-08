import { Button, Table } from 'antd';
import dynamic from 'next/dynamic';

import EditIcon from '@/components/reuse/Button/Edit';
import { HeadCustom } from '@/components/reuse/header.reuse';
import routeState from '@/components/reuse/StateRouteHandler';
import SwitchCustom from '@/components/reuse/SwitchCustom';
import getColumnSearchProps from '@/components/reuse/Table/getColumnSearchProps';

const dataSource = [
  {
    name: 'Supplier 1',
    status: 'Aktif',
    key: '1',
  },
  {
    name: 'Supplier 2',
    status: 'Aktif',
    key: '2',
  },
  {
    name: 'Supplier 3',
    status: 'Aktif',
    key: '3',
  },
  // Tambahkan lebih banyak data jika diperlukan
];

const ListSupplier = () => {
  const columns: any = [
    {
      title: 'No',
      dataIndex: 'idx',
      key: 'idx',
      render: (_: any, __: any, idx: number) => {
        return idx + 1;
      },
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps({
        dataIndex: 'name',
        placeholder: 'Nama Supplier',
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [],
      render: () => {
        return (
          <div>
            <SwitchCustom checked={true} disabled />
          </div>
        );
      },
    },

    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <EditIcon
            onClick={() => {
              routeState({
                page: 'add-supplier',
                data: record,
              });
            }}
            toolTipMsg="Update Supplier"
          />
        </>
      ),
    },
  ];

  return (
    <>
      <HeadCustom
        title={'Supplier'}
        breadcrumbItems={[{ title: 'Data Master' }]}
        buttonActions={[
          <Button
            key={0}
            type="primary"
            onClick={() => {
              routeState({
                page: 'add-supplier',
                data: null,
              });
            }}
          >
            Tambah Supplier
          </Button>,
        ]}
      />

      <div className="p-5">
        <Table
          rowKey={'id'}
          className="mt-3"
          columns={columns}
          dataSource={dataSource}
          loading={false}
          pagination={false}
        />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListSupplier));
