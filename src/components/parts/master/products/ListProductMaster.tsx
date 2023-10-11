import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Popover,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { HeadCustom } from '@/components/reuse/header.reuse';
import LabelComponent from '@/components/reuse/LabelComponent';
import getColumnSearchProps from '@/components/reuse/Table/getColumnSearchProps';
import { formatRupiah } from '@/functions/numbers';
import ProductService from '@/services/product.service';

const typeValues = [
  { value: null, label: 'Semua' },
  { value: '0', label: 'Prabayar' },
  { value: '1', label: 'Pascabayar' },
];

const statusValues = [
  { value: null, label: 'Semua' },
  { value: '1', label: 'Aktif' },
  { value: '0', label: 'Tidak Aktif' },
];

const ListProductMaster = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [productCodeSearch, setProductCodeSearch] = useState('');
  const [categories, setCategories] = useState([
    { value: null, label: 'Semua' },
  ]);
  const [brands, setBrands] = useState([{ value: null, label: 'Semua' }]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategoryUID, setSelectedCategoryUID] = useState<string | null>(
    null
  );
  const [selectedBrandUID, setSelectedBrandUID] = useState<string | null>(null);

  const disableBulkButton = selectedProducts.length === 0;

  const columns: any = [
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => {
        const isAktif = record.product_companies?.status === '1';
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
    },
    {
      title: 'Kode Produk',
      dataIndex: 'product_code',
      ...getColumnSearchProps({
        dataIndex: 'name',
        placeholder: 'Kode produk',
        onSearch: setProductCodeSearch,
      }),
    },
    {
      title: 'Deksripsi',
      dataIndex: 'description',
    },
    {
      title: 'Denom',
      dataIndex: 'denom',
    },
    {
      title: 'Kode Supplier',
      dataIndex: 'supplier_code',
    },
    {
      title: 'Harga beli',
      dataIndex: 'buy_price',
      render: (buyPrice: string) => formatRupiah(+buyPrice),
    },
    {
      title: 'Margin',
      dataIndex: 'margin',
      render: (_: any, record: any) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const margin = +record.product_companies?.margin || 0;
        return formatRupiah(margin);
      },
    },
    {
      title: 'Harga jual',
      dataIndex: 'sell_price',
      render: (_: any, record: any) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const margin = +record.product_companies?.margin || 0;
        const buyPrice = +record.buy_price;
        return formatRupiah(buyPrice + margin);
      },
    },

    {
      title: 'Aksi',
      dataIndex: 'action',
      render: () => {
        return (
          <>
            <Button type="link" danger>
              Nonaktifkan
            </Button>
            <Popover placement="bottom" content={<>Hello</>} trigger="click">
              <Button type="link">More</Button>
            </Popover>
          </>
        );
      },
    },
  ];

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

  const { data: productData, isLoading: productsLoading } = useQuery({
    queryKey: [
      ProductService.Queries.PRODUCTS,
      page,
      limit,
      selectedCategoryUID,
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

  console.log({ productData });
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
      <HeadCustom
        title={'Produk Saya'}
        breadcrumbItems={[
          {
            title: 'Overview',
          },
        ]}
        buttonActions={[
          <Button key={0}>Atur margin berdasarkan kategori</Button>,
          <Button key={1}>Atur margin berdasarkan brand</Button>,
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
            <Col span={6}>
              <div className="my-2">
                <LabelComponent
                  label={'Tipe'}
                  component={
                    <Select
                      className="flex items-center"
                      defaultValue={null}
                      onChange={setSelectedType}
                      options={typeValues}
                    />
                  }
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="my-2">
                <LabelComponent
                  label={'Status'}
                  component={
                    <Select
                      className="flex items-center"
                      defaultValue={null}
                      onChange={setSelectedStatus}
                      options={statusValues}
                    />
                  }
                />
              </div>
            </Col>
          </Row>
        </Card>

        <Space wrap className=" mt-4">
          <Button disabled={disableBulkButton}>Aktifkan</Button>
          <Button disabled={disableBulkButton}>Nonaktifkan</Button>
          <Button disabled={disableBulkButton}>Set Margin</Button>
          <Button disabled={disableBulkButton}>Ganti Supplier</Button>
        </Space>

        <Table
          rowKey={'uuid'}
          className="mt-3"
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          dataSource={productData?.content || []}
          loading={productsLoading}
          pagination={{
            current: page,
            pageSize: limit,
            total: productData ? productData.totalItems : 0,
            onChange: setPage,
          }}
        />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ListProductMaster));
