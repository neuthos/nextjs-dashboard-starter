import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import NumberInput from '@/components/reuse/NumberInput';
import ProductService from '@/services/product.service';

const ModalSetMargin = (param: {
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

  const { mutate: updateMargin, isLoading: loadingUpdateMargin } = useMutation(
    ProductService.updateMargin,
    {
      onSuccess: (res) => {
        if (res) {
          queryClient.invalidateQueries([ProductService.Queries.PRODUCTS]);
          message.success(res.data);
          param.setSelectedProducts([]);
          handleCancel();
        }
      },
    }
  );

  const handleSubmit = () => {
    const margin = form.getFieldValue('margin');
    updateMargin({
      margin,
      productCompanyIds: param.productIds,
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
        disabled={param.disabled}
        type={param.buttonType}
        onClick={showModal}
      >
        Set margin
      </Button>
      <Modal
        onCancel={handleCancel}
        title={`Setting margin`}
        open={isModalOpen}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} className="space-y-5 py-6">
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

export default ModalSetMargin;
