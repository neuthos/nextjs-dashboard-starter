import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import EditIcon from '@/components/reuse/Button/Edit';
import { HeadCustom } from '@/components/reuse/header.reuse';
import routeState from '@/components/reuse/StateRouteHandler';
import SwitchCustom from '@/components/reuse/SwitchCustom';
import getColumnSearchProps from '@/components/reuse/Table/getColumnSearchProps';
import SupplierService from '@/services/supplier.service';

const ListSupplier = () => {
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState('');
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
        onSearch: setNameSearch,
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [],
      render: (val: number) => {
        return (
          <div>
            <SwitchCustom checked={val === 1} disabled />
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

  const { data: suppliers, isLoading } = useQuery({
    queryKey: [SupplierService.Queries.LIST_SUPPLIER, page, nameSearch],
    queryFn: () => SupplierService.list({ page, limit: 10, name: nameSearch }),
  });

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
          rowKey={'uuid'}
          className="mt-3"
          columns={columns}
          dataSource={suppliers?.content || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: suppliers ? suppliers.totalItems : 0,
            onChange: setPage,
          }}
        />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListSupplier));
