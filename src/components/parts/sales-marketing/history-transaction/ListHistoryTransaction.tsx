import {
  Card,
  Col,
  DatePicker,
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

import { HeadCustom } from '@/components/reuse/header.reuse';
import LabelComponent from '@/components/reuse/LabelComponent';
import { formatRupiah } from '@/functions/numbers';

const ListHistoryTransaction = () => {
  const columns = [
    {
      title: 'Reff',
      dataIndex: 'reff',
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
      dataIndex: 'product_type',
    },
    {
      title: 'Name Produk',
      dataIndex: 'product_name',
    },
    {
      title: 'Nomor/ID Agen',
      dataIndex: 'agen_no',
    },
    {
      title: 'Nomor tujuan',
      dataIndex: 'agen_no',
    },
    {
      title: 'Harga',
      dataIndex: 'amount',
    },
    {
      title: 'Total harga',
      dataIndex: 'total_amount',
    },
    {
      title: 'Margin',
      dataIndex: 'margin',
    },
    {
      title: 'Payment method',
      dataIndex: 'payment_method',
    },
    {
      title: 'Status transaksi',
      dataIndex: 'status',
      render: (_: any) => {
        return (
          <>
            <Tag color="green">Sukses</Tag>
          </>
        );
      },
    },
  ];

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
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Transaksi sukses hari ini"
                value={123}
                valueStyle={{ color: '#3f8600' }}
                suffix="kali"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Total pendapatan hari ini"
                value={formatRupiah(1000000)}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
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
              <DatePicker.RangePicker className="h-[42px] w-[225px]" />
              <Input.Search
                placeholder="Masukkan kata kunci"
                className="w-[225px]"
              />
            </div>
            <Table
              rowKey={'uuid'}
              className="mt-3"
              columns={columns}
              dataSource={[{}]}
              loading={false}
              pagination={{
                current: 1,
                pageSize: 10,
                total: 10,
                // onChange: setPage,
              }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListHistoryTransaction));
