import { RightOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Table,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { HeadCustom } from '@/components/reuse/header.reuse';
import LabelComponent from '@/components/reuse/LabelComponent';
import NumberInput from '@/components/reuse/NumberInput';
import routeState from '@/components/reuse/StateRouteHandler';
import { useAuthorizationContext } from '@/functions/AuthorizationContexts';
import { formatToStringDateTimezone } from '@/functions/date';
import ProductService from '@/services/product.service';
import SupplierService from '@/services/supplier.service';
import TransactionService from '@/services/transaction.service';

const PageSetting = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const session = useAuthorizationContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [reffNumber, setReffNumber] = useState('');
  const [filterDate, setFilterDate] = useState<any>([dayjs(), dayjs()]);

  const [cardSelected, setCardSelected] = useState<'ALL' | 'DEFAULT' | null>(
    null
  );

  const { data: company } = useQuery({
    queryKey: [SupplierService.Queries.DETAIL, session.user.koperasi_guid],
    queryFn: () => SupplierService.getDetailCompany(session.user.koperasi_guid),
    enabled: !!session.user.koperasi_guid,
  });

  const { mutate: updateAllMargin, isLoading: loadingAllMargin } = useMutation(
    ProductService.updateMarginAllProducts,
    {
      onSuccess: (res: any) => {
        if (res && res.success) {
          message.success(res.data);
          form.resetFields();
        }
      },
    }
  );

  const { mutate: updateDefaultMargin, isLoading: loadingDefaultMargin } =
    useMutation(ProductService.updateDefaultMargin, {
      onSuccess: (res: any) => {
        if (res && res.success) {
          message.success(res.data);
          setCardSelected(null);
          queryClient.invalidateQueries([SupplierService.Queries.DETAIL]);
        }
      },
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
        show_log: true,
      }),
  });

  const handleSubmit = () => {
    if (cardSelected === 'ALL') {
      const margin = form.getFieldValue('ALL_margin');
      updateAllMargin({
        margin,
      });
    } else if (cardSelected === 'DEFAULT') {
      const margin = form.getFieldValue('DEFAULT_margin');
      updateDefaultMargin({
        defaultMargin: margin,
      });
    } else {
      message.info('Tipe tidak diketahui');
    }
  };

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      render: (_: any) => {
        return <>{dayjs().format('DD MMM YYYY, HH:mm:ss')} WIB</>;
      },
    },
    {
      title: 'Invoice',
      dataIndex: 'reference_number',
      render: (text: string) => text || '-',
    },
    {
      title: 'Detail',
      dataIndex: 'status',
      render: (_: any, record: any) => {
        return (
          <Button
            type="link"
            onClick={() => {
              routeState({
                page: 'log-history-detail',
                data: record,
              });
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  const handleCardSelected = (type: 'ALL' | 'DEFAULT' | null) => {
    if (loadingAllMargin || loadingDefaultMargin) return;

    if (cardSelected && type === cardSelected) {
      setCardSelected(null);
    } else {
      setCardSelected(type);
    }

    form.resetFields();
  };

  useEffect(() => {
    if (company && cardSelected === 'DEFAULT') {
      form.setFieldValue('DEFAULT_margin', +company.default_fee);
    }
  }, [company, cardSelected]);

  return (
    <>
      <HeadCustom
        title={'Pengaturan'}
        breadcrumbItems={[
          { title: 'Sales & marketing' },
          { title: 'Pengaturan' },
        ]}
      />

      <div className="p-5">
        <Row gutter={16}>
          <Col span={12} className="space-y-3">
            <Card
              hoverable
              className={`${
                cardSelected === 'ALL' &&
                'border border-solid border-primary-500'
              }`}
              onClick={() => handleCardSelected('ALL')}
            >
              <div className="flex items-center">
                <div>
                  <Typography.Title level={5}>
                    Atur semua margin produk
                  </Typography.Title>
                  <p>
                    Mengubah semua nominal komisi semua produk-produk end user
                    sesuai dengan nominal yang dimasukkan
                  </p>
                </div>

                <RightOutlined />
              </div>
            </Card>

            <Card
              hoverable
              className={`${
                cardSelected === 'DEFAULT' &&
                'border border-solid border-primary-500'
              }`}
              onClick={() => handleCardSelected('DEFAULT')}
            >
              <div className="flex items-center">
                <div>
                  <Typography.Title level={5}>
                    Atur default margin
                  </Typography.Title>
                  <p>
                    Apabila ada produk prabayar ditambahkan maka akan secara
                    otomatis marginnya sesuai dengan margin default
                  </p>
                </div>

                <RightOutlined />
              </div>
            </Card>
          </Col>
          {cardSelected && (
            <Col span={12}>
              <Card className="h-full bg-gray-200">
                <Form form={form} onFinish={handleSubmit} className="w-full">
                  <LabelComponent
                    label={'Margin'}
                    component={
                      <Form.Item
                        name={`${cardSelected}_margin`}
                        className="w-full"
                        rules={[
                          {
                            required: true,
                            message: 'Margin tidak boleh kosong!',
                          },
                        ]}
                      >
                        <NumberInput className="w-full" placeholder="0" />
                      </Form.Item>
                    }
                  />

                  <Form.Item>
                    <div className="flex items-center justify-center gap-x-2">
                      <Button
                        className="w-[120px]"
                        onClick={() => handleCardSelected(null)}
                      >
                        Batal
                      </Button>
                      <Button
                        type="primary"
                        className="w-[120px]"
                        htmlType="submit"
                        loading={loadingAllMargin || loadingDefaultMargin}
                      >
                        Simpan
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          )}
        </Row>

        <div className="mt-5">
          <Card>
            <Typography.Title level={4}>Log Transaksi</Typography.Title>

            <div className="my-5 flex items-end gap-x-4">
              <div>
                <LabelComponent
                  label={'Cari berdasar ID Transaksi'}
                  component={
                    <Input.Search
                      onSearch={setReffNumber}
                      className="w-[225px]"
                      placeholder="Cth: Trx.."
                    />
                  }
                />
              </div>
              <div>
                <DatePicker.RangePicker
                  allowClear={false}
                  value={filterDate}
                  onChange={(val: any) => setFilterDate(val)}
                  className="h-[42px] w-[225px]"
                />
              </div>
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

export default dynamic(() => Promise.resolve(PageSetting));
