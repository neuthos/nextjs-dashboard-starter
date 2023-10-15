/* eslint-disable no-unsafe-optional-chaining */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  message,
  Modal,
  Popover,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import dynamic from 'next/dynamic';
import router from 'next/router';
import { useState } from 'react';

import { HeadCustom } from '@/components/reuse/header.reuse';
import LabelComponent from '@/components/reuse/LabelComponent';
import getColumnSearchProps from '@/components/reuse/Table/getColumnSearchProps';
import { formatRupiah } from '@/functions/numbers';
import ProductService from '@/services/product.service';

import ModalSetMargin from './ModalSetMargin';
import ModalSetMarginByBrand from './ModalSetMarginByBrand';
import ModalSetMarginByCategory from './ModalSetMarginByCategory';
import ModalSetSupplier from './ModalSetSupplier';

// const typeValues = [
//   { value: null, label: 'Semua' },
//   { value: '0', label: 'Prabayar' },
//   { value: '1', label: 'Pascabayar' },
// ];

// const statusValues = [
//   { value: null, label: 'Semua' },
//   { value: '1', label: 'Aktif' },
//   { value: '0', label: 'Tidak Aktif' },
// ];

const ListProductMaster = () => {
  const queryClient = useQueryClient();
  const [modal, contextHolder] = Modal.useModal();
  const [nameSearch, setNameSearch] = useState('');
  const [productCodeSearch, setProductCodeSearch] = useState('');
  const [categories, setCategories] = useState([
    { value: null, label: 'Semua' },
  ]);
  const [brands, setBrands] = useState([{ value: null, label: 'Semua' }]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>('0');
  const [selectedStatus] = useState<string | null>(null);
  const [selectedCategoryUID, setSelectedCategoryUID] = useState<string | null>(
    null
  );
  const [selectedBrandUID, setSelectedBrandUID] = useState<string | null>(null);

  const disableBulkButton = selectedProducts.length === 0;

  const { mutate: updateStatus, isLoading: loadingUpdateStatus } = useMutation(
    ProductService.updateStatus,
    {
      onSuccess: (res) => {
        if (res) {
          setSelectedProducts([]);
          queryClient.invalidateQueries([ProductService.Queries.PRODUCTS]);
          message.success(res.data);
          router.push('/master/products');
        }
      },
    }
  );

  const columnType: any = {
    '0': [
      {
        title: 'Status',
        dataIndex: 'status',
        render: (_: any, record: any) => {
          const isAktif = record.status === '1';
          const data = {
            tagColor: isAktif ? 'green' : 'red',
            label: isAktif ? 'Aktif' : 'Tidak aktif',
          };
          return <Tag color={data.tagColor}>{data.label}</Tag>;
        },
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        ...getColumnSearchProps({
          dataIndex: 'name',
          placeholder: 'Nama Produk',
          onSearch: setNameSearch,
        }),
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.name || '-'}</>;
        },
      },
      {
        title: 'Kode Produk',
        dataIndex: 'product_code',
        ...getColumnSearchProps({
          dataIndex: 'name',
          placeholder: 'Kode produk',
          onSearch: setProductCodeSearch,
        }),
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.product_code || '-'}</>;
        },
      },
      {
        title: 'Deksripsi',
        dataIndex: 'description',
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.description || '-'}</>;
        },
      },
      {
        title: 'Denom',
        dataIndex: 'denom',
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.denom || '-'}</>;
        },
      },
      {
        title: 'Kode Supplier',
        dataIndex: 'supplier_code',
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.supplier_code || '-'}</>;
        },
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier',
        render: (_: any, record: any) => {
          return <>{record?.supplier?.name || '-'}</>;
        },
      },
      {
        title: 'Harga beli',
        dataIndex: 'buy_price',
        render: (_: string, record: any) => {
          const isQpay =
            record?.supplier_id === process.env.NEXT_PUBLIC_QPAY_UUID;

          const buyPrice = isQpay
            ? +record?.product_digital_master?.buy_price
            : record?.buy_price;

          return formatRupiah(+buyPrice);
        },
      },
      {
        title: 'Margin',
        dataIndex: 'margin',
        render: (_: any, record: any) => {
          // eslint-disable-next-line no-unsafe-optional-chaining
          const margin = +record?.margin || 0;
          return formatRupiah(margin);
        },
      },
      {
        title: 'Harga jual',
        dataIndex: 'sell_price',
        render: (_: any, record: any) => {
          const isQpay =
            record?.supplier_id === process.env.NEXT_PUBLIC_QPAY_UUID;

          const buyPrice = isQpay
            ? +record?.product_digital_master?.buy_price
            : +record?.buy_price;

          const margin = +record?.margin || 0;

          return formatRupiah(buyPrice + margin);
        },
      },

      {
        title: 'Aksi',
        dataIndex: 'action',
        render: (_: any, record: any) => {
          const isAktif = record?.status === '1';
          return (
            <>
              {isAktif ? (
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    modal.confirm({
                      title: 'Nonaktifkan produk?',
                      content: (
                        <>
                          <p>
                            Jika anda menonaktifkan produk maka produk tidak
                            akan muncul di Kasir maupun aplikasi
                          </p>
                        </>
                      ),
                      onOk() {
                        updateStatus({
                          status: '0',
                          productCompanyIds: [record.uuid],
                        });
                      },
                    });
                  }}
                >
                  Nonaktifkan
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    modal.confirm({
                      title: 'Nonaktifkan produk?',
                      content: (
                        <>
                          <p>
                            Jika anda mengaktifkan produk maka produk akan
                            muncul di Kasir maupun aplikasi
                          </p>
                        </>
                      ),
                      onOk() {
                        updateStatus({
                          status: '1',
                          productCompanyIds: [record.uuid],
                        });
                      },
                    });
                  }}
                  className="text-green-600"
                >
                  Aktifkan
                </Button>
              )}

              <Popover
                placement="bottom"
                content={
                  <>
                    <div className="w-[120px]">
                      <ModalSetMargin
                        buttonType="link"
                        disabled={false}
                        data={record}
                        productIds={[record?.uuid]}
                        setSelectedProducts={setSelectedProducts}
                      />
                      <ModalSetSupplier
                        buttonType="link"
                        disabled={false}
                        data={record}
                        productIds={[record?.uuid]}
                        setSelectedProducts={setSelectedProducts}
                      />
                    </div>
                  </>
                }
                trigger="click"
              >
                <Button type="link">More</Button>
              </Popover>
            </>
          );
        },
      },
    ],
    '1': [
      {
        title: 'Status',
        dataIndex: 'status',
        render: (_: any, record: any) => {
          const isAktif = record.status === '1';
          const data = {
            tagColor: isAktif ? 'green' : 'red',
            label: isAktif ? 'Aktif' : 'Tidak aktif',
          };
          return <Tag color={data.tagColor}>{data.label}</Tag>;
        },
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        ...getColumnSearchProps({
          dataIndex: 'name',
          placeholder: 'Nama Produk',
          onSearch: setNameSearch,
        }),
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.name || '-'}</>;
        },
      },
      {
        title: 'Kode Produk',
        dataIndex: 'product_code',
        ...getColumnSearchProps({
          dataIndex: 'name',
          placeholder: 'Kode produk',
          onSearch: setProductCodeSearch,
        }),
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.product_code || '-'}</>;
        },
      },
      {
        title: 'Deksripsi',
        dataIndex: 'description',
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.description || '-'}</>;
        },
      },
      {
        title: 'Kode Supplier',
        dataIndex: 'supplier_code',
        render: (_: any, record: any) => {
          return <>{record?.product_digital_master?.supplier_code || '-'}</>;
        },
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier',
        render: (_: any, record: any) => {
          return <>{record?.supplier?.name || '-'}</>;
        },
      },
      {
        title: 'Komisi',
        dataIndex: 'buy_price',
        render: (_: string, record: any) => {
          const buyPrice = +record?.product_digital_master?.buy_price;

          return formatRupiah(+buyPrice);
        },
      },
      {
        title: 'Aksi',
        dataIndex: 'action',
        render: (_: any, record: any) => {
          const isAktif = record?.status === '1';
          return (
            <>
              {isAktif ? (
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    modal.confirm({
                      title: 'Nonaktifkan produk?',
                      content: (
                        <>
                          <p>
                            Jika anda menonaktifkan produk maka produk tidak
                            akan muncul di Kasir maupun aplikasi
                          </p>
                        </>
                      ),
                      onOk() {
                        updateStatus({
                          status: '0',
                          productCompanyIds: [record.uuid],
                        });
                      },
                    });
                  }}
                >
                  Nonaktifkan
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    modal.confirm({
                      title: 'Nonaktifkan produk?',
                      content: (
                        <>
                          <p>
                            Jika anda mengaktifkan produk maka produk akan
                            muncul di Kasir maupun aplikasi
                          </p>
                        </>
                      ),
                      onOk() {
                        updateStatus({
                          status: '1',
                          productCompanyIds: [record.uuid],
                        });
                      },
                    });
                  }}
                  className="text-green-600"
                >
                  Aktifkan
                </Button>
              )}

              <Popover
                placement="bottom"
                content={
                  <>
                    <div className="w-[120px]">
                      <ModalSetMargin
                        buttonType="link"
                        disabled={false}
                        data={record}
                        productIds={[record?.uuid]}
                        setSelectedProducts={setSelectedProducts}
                      />
                      <ModalSetSupplier
                        buttonType="link"
                        disabled={false}
                        data={record}
                        productIds={[record?.uuid]}
                        setSelectedProducts={setSelectedProducts}
                      />
                    </div>
                  </>
                }
                trigger="click"
              >
                <Button type="link">More</Button>
              </Popover>
            </>
          );
        },
      },
    ],
  };

  const { isLoading: categoriesLoading } = useQuery({
    queryKey: [ProductService.Queries.PRODUCT_CATEGORIES_LIST],
    queryFn: () => ProductService.productCategoriesList(),
    onSuccess: (res: any) => {
      if (res) {
        const categoriesSelect = res.map((el: any) => ({
          value: el.uuid,
          label: el.name,
        }));

        setCategories([{ value: null, label: 'Semua' }, ...categoriesSelect]);
      }
    },
  });

  const { isLoading: brandsLoading } = useQuery({
    queryKey: [ProductService.Queries.PRODUCT_BRANDS_LIST, selectedCategoryUID],
    queryFn: () => ProductService.productBrandList(selectedCategoryUID ?? ''),
    enabled: selectedCategoryUID !== null,
    onSuccess: (res: any) => {
      if (res) {
        const brandsSelect = res.map((el: any) => ({
          value: el.uuid,
          label: el.name,
        }));

        setBrands([{ value: null, label: 'Semua' }, ...brandsSelect]);
      }
    },
  });

  const { data: productCompanies, isLoading: productCompaniesLoading } =
    useQuery({
      queryKey: [
        ProductService.Queries.PRODUCTS,
        page,
        limit,
        selectedBrandUID,
        selectedStatus,
        selectedType,
        nameSearch,
        productCodeSearch,
      ],
      queryFn: () =>
        ProductService.productList({
          page,
          limit,
          product_digital_brand_id: selectedBrandUID,
          status: selectedStatus,
          is_bill_payment: selectedType,
          name: nameSearch,
          product_code: productCodeSearch,
        }),
    });

  const bulkUpdateStatus = (toAktif: boolean) => {
    if (toAktif) {
      modal.confirm({
        title: `Aktifkan ${selectedProducts.length} produk?`,
        content: (
          <>
            <p>
              Jika anda mengaktifkan produk maka produk akan muncul di Kasir
              maupun aplikasi
            </p>
          </>
        ),
        onOk() {
          updateStatus({
            status: '1',
            productCompanyIds: selectedProducts.map((el) => el?.uuid || ''),
          });
          setSelectedProducts([]);
        },
      });
    } else {
      modal.confirm({
        title: `Nonaktifkan ${selectedProducts.length} produk?`,
        content: (
          <>
            <p>
              Jika anda menonaktifkan produk maka produk tidak akan muncul di
              Kasir maupun aplikasi
            </p>
          </>
        ),
        onOk() {
          updateStatus({
            status: '0',
            productCompanyIds: selectedProducts.map((el) => el?.uuid || ''),
          });
          setSelectedProducts([]);
        },
      });
    }
  };

  const rowSelection = {
    onChange: (_: any, selectedRows: any[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`);
      setSelectedProducts(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <>
      {contextHolder}
      <HeadCustom
        title={'Produk Saya'}
        breadcrumbItems={[
          {
            title: 'Overview',
          },
        ]}
        buttonActions={[
          <div key={0}>
            <ModalSetMarginByCategory
              buttonType="default"
              disabled={false}
              data={{}}
              productIds={selectedProducts?.map((el) => el?.uuid)}
              setSelectedProducts={setSelectedProducts}
            />
          </div>,
          <div key={1}>
            <ModalSetMarginByBrand
              buttonType="default"
              disabled={false}
              data={{}}
              productIds={selectedProducts?.map((el) => el?.uuid)}
              setSelectedProducts={setSelectedProducts}
            />
          </div>,
        ]}
      />
      <div className="p-5">
        <Card>
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <div className="my-2">
                <LabelComponent
                  label={'Kategori'}
                  component={
                    <Select
                      loading={categoriesLoading}
                      className="flex items-center"
                      defaultValue={null}
                      options={categories}
                      onChange={setSelectedCategoryUID}
                    />
                  }
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="my-2">
                <LabelComponent
                  label={'Brand / Operator'}
                  component={
                    <Select
                      className="flex items-center"
                      defaultValue={null}
                      disabled={!selectedCategoryUID}
                      options={brands}
                      loading={brandsLoading && selectedCategoryUID !== null}
                      onChange={setSelectedBrandUID}
                    />
                  }
                />
              </div>
            </Col>

            <Col span={12}>
              <div className="my-2">
                <Segmented
                  className="h-[60px] w-full font-bold"
                  block
                  size="large"
                  options={[
                    {
                      label: <p className="my-auto mt-5 font-bold">PRABAYAR</p>,
                      value: '0',
                    },
                    {
                      label: (
                        <p className="my-auto mt-5 font-bold">PASCABAYAR</p>
                      ),
                      value: '1',
                    },
                  ]}
                  value={selectedType}
                  onChange={setSelectedType}
                />
              </div>
            </Col>
          </Row>
        </Card>

        <Space wrap className=" mt-4">
          <Button
            onClick={() => bulkUpdateStatus(true)}
            disabled={disableBulkButton}
          >
            Aktifkan
          </Button>
          <Button
            onClick={() => bulkUpdateStatus(false)}
            disabled={disableBulkButton}
          >
            Nonaktifkan
          </Button>
          <ModalSetMargin
            buttonType="default"
            disabled={disableBulkButton}
            data={{}}
            productIds={selectedProducts?.map((el) => el?.uuid)}
            setSelectedProducts={setSelectedProducts}
          />
        </Space>
        <Table
          rowKey={'uuid'}
          className="mt-3"
          columns={columnType[selectedType]}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedProducts.map((el) => el.uuid),
            ...rowSelection,
          }}
          dataSource={productCompanies?.content || []}
          loading={productCompaniesLoading || loadingUpdateStatus}
          pagination={{
            current: page,
            pageSize: limit,
            total: productCompanies ? productCompanies.totalItems : 0,
            onChange: setPage,
          }}
        />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListProductMaster));
