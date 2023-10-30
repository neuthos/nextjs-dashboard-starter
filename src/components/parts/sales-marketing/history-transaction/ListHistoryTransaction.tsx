/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { HeadCustom } from '@/components/reuse/header.reuse';
import LabelComponent from '@/components/reuse/LabelComponent';
import ProductConfig from '@/constants/product.constant';
import { formatToStringDateTimezone } from '@/functions/date';
import { formatRupiah } from '@/functions/numbers';
import TransactionService from '@/services/transaction.service';

const ListHistoryTransaction = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [reffNumber, setReffNumber] = useState('');
  const [filterDate, setFilterDate] = useState<any>([dayjs(), dayjs()]);

  const columns = [
    {
      title: 'Reff',
      dataIndex: 'reference_number',
      render: (text: string) => text || '-',
    },
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      render: (_: any) => {
        return <>{dayjs().format('DD MMM YYYY, HH:mm:ss')} WIB</>;
      },
    },
    {
      title: 'Tipe Produk',
      dataIndex: 'product_categories',
    },
    {
      title: 'Name Produk',
      dataIndex: 'product_name',
    },
    {
      title: 'Nomor/ID Agen',
      dataIndex: 'supplier_name',
    },
    {
      title: 'Nomor tujuan',
      dataIndex: 'destination',
    },
    {
      title: 'Harga',
      dataIndex: 'buy_price',
      render: (buyPrice: any) => formatRupiah(+buyPrice),
    },
    {
      title: 'Margin',
      dataIndex: 'margin',
      render: (margin: any) => formatRupiah(+margin || 0),
    },
    {
      title: 'Total harga',
      dataIndex: 'sell_price',
      render: (sellPrice: any) => formatRupiah(+sellPrice),
    },
    {
      title: 'Payment method',
      dataIndex: 'payment_method',
    },
    {
      title: 'Status transaksi',
      dataIndex: 'status',
      render: (statusTrx: number) => {
        const dataTag: any = {
          0: { color: 'gray', label: 'Pending' },
          1: { color: 'green', label: 'Sukses' },
          2: { color: 'volcano', label: 'Gagal' },
        };

        return (
          <>
            <Tag color={dataTag[statusTrx]?.color}>
              {dataTag[statusTrx]?.label}
            </Tag>
          </>
        );
      },
    },
  ];

  const { data: stats, isLoading } = useQuery({
    queryKey: [TransactionService.Queries.STATISTIC],
    queryFn: () => TransactionService.trxStats(),
  });

  const { data: trx, isLoading: loadingTrx } = useQuery({
    queryKey: [
      TransactionService.Queries.LIST_TRANSACTION,
      page,
      limit,
      reffNumber,
      filterDate[0]?.format('DD MM YYYY'),
      filterDate[1]?.format('DD MM YYYY'),
    ],
    queryFn: () =>
      TransactionService.list({
        page,
        limit,
        refference_number: reffNumber,
        start_date: formatToStringDateTimezone(
          filterDate[0]?.startOf('day')?.toISOString()
        ),
        end_date: formatToStringDateTimezone(
          filterDate[1]?.endOf('day')?.toISOString()
        ),
      }),
  });

  return (
    <>
      <HeadCustom
        title={'Riwayat transaksi'}
        breadcrumbItems={[
          { title: 'Sales & marketing' },
          { title: 'Riwayat transaksi' },
        ]}
      />

      <div className="p-5">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                loading={isLoading}
                value={stats?.total_transactions}
                title="Total transaksi hari ini"
                suffix="trx"
                valueStyle={{ color: ProductConfig.color.primary[700] }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Transaksi sukses hari ini"
                value={stats?.total_successful_transactions}
                loading={isLoading}
                valueStyle={{ color: '#3f8600' }}
                suffix="trx"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                loading={isLoading}
                title="Transaksi Gagal hari ini"
                value={stats?.total_failed_transactions}
                valueStyle={{ color: 'red' }}
                suffix="trx"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Transaksi Pending hari ini"
                valueStyle={{ color: 'gray' }}
                value={stats?.total_pending_transactions}
                loading={isLoading}
                suffix="trx"
              />
            </Card>
          </Col>

          <Divider />

          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Total pendapatan hari ini"
                valueStyle={{ color: '#3f8600' }}
                value={formatRupiah(+stats?.total_margin || 0)}
                loading={isLoading}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Jumlah omset"
                valueStyle={{ color: '#3f8600' }}
                value={formatRupiah(+stats?.total_revenue || 0)}
                loading={isLoading}
              />
            </Card>
          </Col>
          <Divider />
        </Row>

        <div className="mt-5">
          <div className="mb-10">
            <LabelComponent
              label={'Produk'}
              component={
                <Select className="w-[225px]" placeholder="Pilih produk" />
              }
            />
          </div>

          <Card className="mt-5">
            <Typography.Title level={4}>Riwayat transaksi</Typography.Title>

            <div className="flex items-center gap-x-3">
              <DatePicker.RangePicker
                allowClear={false}
                value={filterDate}
                onChange={(val: any) => setFilterDate(val)}
                className="h-[42px] w-[225px]"
              />
              <Input.Search
                onSearch={setReffNumber}
                placeholder="Masukkan kata kunci"
                className="w-[225px]"
              />
            </div>
            <Table
              rowKey={'uuid'}
              className="mt-3"
              columns={columns}
              dataSource={trx?.content || []}
              loading={loadingTrx}
              pagination={{
                current: page,
                pageSize: limit,
                total: trx ? trx.pagination.totalItems : 0,
                onChange: (el: number, sizeNew: number) => {
                  setPage(el);
                  setLimit(sizeNew);
                },
              }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListHistoryTransaction));
