/* eslint-disable no-unsafe-optional-chaining */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Form, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import LabelComponent from '@/components/reuse/LabelComponent';
import NumberInput from '@/components/reuse/NumberInput';
import ProductService from '@/services/product.service';
import SupplierService from '@/services/supplier.service';

const ModalSetSupplier = (param: {
  disabled: boolean;
  data: any;
  productIds: string[];
  setSelectedProducts: (param: any) => void;
  buttonType: 'link' | 'default';
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedSupplierId, setSelectedSupplierId] = useState('');

  const isQpay = selectedSupplierId === process.env.NEXT_PUBLIC_QPAY_UUID;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const { data: dataFee, isLoading: feeLoading } = useQuery({
    queryKey: [SupplierService.Queries.FEE],
    queryFn: () => SupplierService.getFee(),
    enabled: isModalOpen && !isQpay,
  });

  const { data: suppliers, isLoading } = useQuery({
    queryKey: [SupplierService.Queries.LIST_SUPPLIER],
    queryFn: () => SupplierService.list({ page: 1, limit: 99999, status: 1 }),
    enabled: isModalOpen,
  });

  const { mutate: updateSupplier, isLoading: loadingUpdateMargin } =
    useMutation(ProductService.updateSupplier, {
      onSuccess: (res) => {
        if (res) {
          queryClient.invalidateQueries([ProductService.Queries.PRODUCTS]);
          message.success(res.data);
          param.setSelectedProducts([]);
          handleCancel();
        }
      },
    });

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    updateSupplier({
      supplierId: formData.supplier_id,
      productCompanyIds: [param.data?.uuid],
      buyPrice: formData.buy_price,
    });
  };

  useEffect(() => {
    if (param?.data) {
      const supplierIdData = param.data.supplier_id;
      form.setFieldValue('supplier_id', supplierIdData);
      form.setFieldValue('buy_price', +param.data.buy_price);
      setSelectedSupplierId(supplierIdData);
    }
  }, [param?.data]);

  useEffect(() => {
    if (isQpay) {
      form.setFieldValue(
        'buy_price',
        +param?.data?.product_digital_master?.buy_price
      );
    }
  }, [isQpay]);

  return (
    <>
      <Button
        disabled={param.disabled}
        type={param.buttonType}
        onClick={showModal}
      >
        Ganti supplier
      </Button>
      <Modal
        title={`Ganti Supplier`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit} className="space-y-5 py-6">
          <LabelComponent
            label={'Pilih supplier'}
            component={
              <Form.Item
                name="supplier_id"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Supplier tidak boleh kosong!',
                  },
                ]}
              >
                <Select
                  loading={isLoading}
                  className="flex w-full items-center"
                  onChange={setSelectedSupplierId}
                  options={suppliers?.content?.map((el: any) => ({
                    value: el.uuid,
                    label: el.name,
                  }))}
                />
              </Form.Item>
            }
          />

          <LabelComponent
            label={'Harga beli'}
            component={
              <Form.Item
                name="buy_price"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Harga beli tidak boleh kosong!',
                  },
                ]}
              >
                <NumberInput
                  disabled={isQpay}
                  className="w-full"
                  readOnly={isQpay}
                  placeholder={0}
                  addonAfter={isQpay ? undefined : `+${dataFee?.fee || 250}`}
                />
              </Form.Item>
            }
          />

          {!isQpay && !feeLoading && (
            <div className="mt-5">
              <Alert
                className="mt-4"
                message={`Jika memilih supplier selain QPAY maka harus mengisi harga beli ditambah ${
                  dataFee?.fee || 250
                } rupiah`}
                type="warning"
              />
            </div>
          )}

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

export default ModalSetSupplier;
