/* eslint-disable no-nested-ternary */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Empty,
  message,
  Modal,
  Row,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import EditIcon from '@/components/reuse/Button/Edit';
import { HeadCustom } from '@/components/reuse/header.reuse';
import routeState from '@/components/reuse/StateRouteHandler';
import SwitchCustom from '@/components/reuse/SwitchCustom';
import getColumnSearchProps from '@/components/reuse/Table/getColumnSearchProps';
import SupplierService from '@/services/supplier.service';

const ListSupplier = () => {
  const queryClient = useQueryClient();
  const [modal, contextHolder] = Modal.useModal();

  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState('');

  const { mutate: updateStatus, isLoading: loadingUpdateStatus } = useMutation(
    SupplierService.updateStatus,
    {
      onSuccess: (res) => {
        if (res) {
          message.success(res?.data);
          queryClient.invalidateQueries([
            SupplierService.Queries.LIST_SUPPLIER,
          ]);
        }
      },
    }
  );

  const handleModalUpdateStatus = (status: number, uuid: string) => {
    const toAktif = status === 0;
    const statusUpdateTo = status === 0 ? 1 : status === 1 ? 0 : null;

    if (statusUpdateTo === null) {
      message.error('Status tidak valid');
    } else {
      modal.confirm({
        title: toAktif ? 'Aktifkan produk?' : 'Nonaktifkan produk?',
        content: (
          <>
            <p>
              {toAktif
                ? 'Kamu akan mengaktifkan status supplier ini dan bisa membeli produk dari supplier ini'
                : 'Semua produk yang sudah terhubung dengan supplier ini akan diubah menjadi default supplier (QPAY)'}
            </p>
          </>
        ),
        onOk() {
          updateStatus({
            uuid,
            body: { status: statusUpdateTo },
          });
        },
      });
    }
  };

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
        onSearch: (val: string) => {
          setNameSearch(val);
        },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: number, record: any) => {
        return (
          <div className="cursor-pointer">
            <SwitchCustom
              checked={val === 1}
              onChange={() => handleModalUpdateStatus(val, record.uuid)}
            />
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

  const { data: supplierDefault, isLoading: loadingDefault } = useQuery({
    queryKey: [SupplierService.Queries.LIST_SUPPLIER_DEFAULT],
    queryFn: () => SupplierService.listDefault(),
  });

  console.log({ supplierDefault, loadingDefault });

  return (
    <>
      {contextHolder}
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
        <Typography.Title level={4}>Supplier Default</Typography.Title>
        <Row gutter={[10, 10]}>
          {loadingDefault ? (
            <Skeleton.Button active />
          ) : supplierDefault && supplierDefault.length ? (
            supplierDefault.map((el: any, idx: number) => (
              <Col span={6} key={idx}>
                <Card className="text-[14px] font-bold">{el.name}</Card>
              </Col>
            ))
          ) : (
            <Empty />
          )}
        </Row>

        <Typography.Title level={4} className="mt-5">
          Supplier-mu
        </Typography.Title>
        <Table
          rowKey={'uuid'}
          className="mt-3"
          columns={columns}
          dataSource={suppliers?.content || []}
          loading={isLoading || loadingUpdateStatus}
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
