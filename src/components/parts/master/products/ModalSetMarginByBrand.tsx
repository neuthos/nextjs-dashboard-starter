import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import LabelComponent from '@/components/reuse/LabelComponent';
import NumberInput from '@/components/reuse/NumberInput';
import ProductService from '@/services/product.service';

const ModalSetMarginByBrand = (param: {
  disabled: boolean;
  productIds: string[];
  setSelectedProducts: (param: any) => void;
  buttonType: 'link' | 'default';
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedCategoryUID, setSelectedCategoryUID] = useState<string | null>(
    null
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const { mutate: updateMarginByBrand, isLoading: loadingUpdateMargin } =
    useMutation(ProductService.updateMarginByBrand, {
      onSuccess: (res) => {
        if (res) {
          queryClient.invalidateQueries([ProductService.Queries.PRODUCTS]);
          message.success(res.data);
          param.setSelectedProducts([]);
          handleCancel();
        }
      },
    });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: [ProductService.Queries.PRODUCT_CATEGORIES_LIST],
    queryFn: () => ProductService.productCategoriesList(),
  });

  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: [ProductService.Queries.PRODUCT_BRANDS_LIST, selectedCategoryUID],
    queryFn: () => ProductService.productBrandList(selectedCategoryUID ?? ''),
    enabled: selectedCategoryUID !== null,
  });

  const handleSubmit = () => {
    const brandId = form.getFieldValue('product_brand_id');
    const margin = form.getFieldValue('margin');

    updateMarginByBrand({
      margin,
      brandId,
    });
  };

  useEffect(() => {
    form.setFieldValue('product_brand_id', undefined);
  }, [selectedCategoryUID]);

  return (
    <>
      <Button
        key={1}
        disabled={param.disabled}
        type={param.buttonType}
        onClick={showModal}
      >
        Atur margin berdasarkan brand
      </Button>
      <Modal
        onCancel={handleCancel}
        title={`Setting margin`}
        open={isModalOpen}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} className="space-y-5 py-6">
          <LabelComponent
            label={'Kategori'}
            component={
              <Form.Item
                name="product_category_id"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Kategori tidak boleh kosong!',
                  },
                ]}
              >
                <Select
                  loading={categoriesLoading}
                  placeholder="Pilih kategori"
                  onChange={setSelectedCategoryUID}
                  className="flex w-full items-center"
                  options={categories?.map((el: any) => ({
                    value: el.uuid,
                    label: el.name,
                  }))}
                />
              </Form.Item>
            }
          />

          <LabelComponent
            label={'Brand'}
            component={
              <Form.Item
                name="product_brand_id"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Brand tidak boleh kosong!',
                  },
                ]}
              >
                <Select
                  disabled={!selectedCategoryUID}
                  loading={brandsLoading}
                  placeholder="Pilih brand"
                  className="flex w-full items-center"
                  options={brands?.map((el: any) => ({
                    value: el.uuid,
                    label: el.name,
                  }))}
                />
              </Form.Item>
            }
          />

          <LabelComponent
            label={'Margin'}
            component={
              <Form.Item
                name="margin"
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
              <Button className="w-[120px]" onClick={handleCancel}>
                Batal
              </Button>
              <Button
                type="primary"
                className="w-[120px]"
                htmlType="submit"
                loading={loadingUpdateMargin}
              >
                Simpan
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalSetMarginByBrand;
