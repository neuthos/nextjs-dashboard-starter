import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import LabelComponent from '@/components/reuse/LabelComponent';
import NumberInput from '@/components/reuse/NumberInput';
import ProductService from '@/services/product.service';

const ModalSetMarginByCategory = (param: {
  disabled: boolean;
  data: any;
  productIds: string[];
  setSelectedProducts: (param: any) => void;
  buttonType: 'link' | 'default';
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const { mutate: updateMarginByCategory, isLoading: loadingUpdateMargin } =
    useMutation(ProductService.updateMarginByCategory, {
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

  const handleSubmit = () => {
    const categoryId = form.getFieldValue('product_category_id');
    const margin = form.getFieldValue('margin');

    updateMarginByCategory({
      margin,
      categoryId,
    });
  };

  useEffect(() => {
    if (param?.data) {
      form.setFieldValue('margin', param.data.margin);
    }
  }, [param?.data]);

  return (
    <>
      <Button
        key={0}
        disabled={param.disabled}
        type={param.buttonType}
        onClick={showModal}
      >
        Atur margin berdasarkan kategori
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

export default ModalSetMarginByCategory;
