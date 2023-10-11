import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input, message, Space, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { HeadCustom } from '@/components/reuse/header.reuse';
import UriHookState from '@/components/reuse/UriHookState';
import SupplierService from '@/services/supplier.service';

const FormSupplier = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [form] = Form.useForm();
  const uriData = UriHookState();
  const pageData = uriData?.data;

  const updateData = pageData || null;
  const titlePage = updateData ? 'Update Supplier' : 'Tambah Supplier';

  const { mutate: addSupplier, isLoading } = useMutation(
    SupplierService.create,
    {
      onSuccess: (res: any) => {
        form.resetFields();
        if (res) {
          queryClient.invalidateQueries([
            SupplierService.Queries.LIST_SUPPLIER,
          ]);
          message.success('Berhasil menambah supplier');
          router.push('/master/supplier');
        }
      },
    }
  );

  const { mutate: updateSupplier, isLoading: loadingUpdate } = useMutation(
    SupplierService.update,
    {
      onSuccess: (res: any) => {
        form.resetFields();
        if (res) {
          queryClient.invalidateQueries([
            SupplierService.Queries.LIST_SUPPLIER,
          ]);
          message.success('Berhasil memperbarui supplier');
          router.push('/master/supplier');
        }
      },
    }
  );

  const validateIpAddress = (_: any, value: any, callback: any) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(,\s*(\d{1,3}\.){3}\d{1,3})*$/;
    if (!ipRegex.test(value)) {
      callback(
        'Format IP tidak valid. Gunakan format IP yang benar, dipisahkan oleh koma.'
      );
    } else {
      callback();
    }
  };

  const handleSubmit = () => {
    const payload = form.getFieldsValue();
    payload.host = 'google.com';

    if (updateData) {
      updateSupplier({
        uuid: updateData.uuid,
        body: payload,
      });
    } else {
      addSupplier(payload);
    }
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldsValue({
        name: updateData.name,
        secret_key: updateData.secret_key,
        public_key: updateData.public_key,
        callbackIP: updateData.callbackIP,
      });
    }
  }, [updateData]);
  return (
    <>
      <HeadCustom
        title={titlePage}
        breadcrumbItems={[
          { title: 'Data Master' },
          { title: 'List Supplier', path: '/master/supplier' },
          { title: titlePage },
        ]}
      />

      <section className="p-5">
        <Form onFinish={handleSubmit} form={form} className="space-y-4">
          <Card>
            <Typography.Title level={5}>Nama Supplier</Typography.Title>
            <p className="mb-3">Masukkan nama supplier</p>
            <Form.Item
              name="name"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Nama supplier tidak boleh kosong!',
                },
              ]}
            >
              <Input max={255} placeholder="QPAY" />
            </Form.Item>
          </Card>

          <Card>
            <Typography.Title level={5}>Secret Key</Typography.Title>
            <p className="mb-3">
              Klik tombol dibawah untuk menghasilkan secret key
            </p>
            <Form.Item
              name="secret_key"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Secret key tidak boleh kosong!',
                },
              ]}
            >
              <Input.TextArea readOnly={false} />
            </Form.Item>

            <Space>
              <Button type="primary">Buat Secret Key</Button>
              <Button>Copy ke clipboard</Button>
            </Space>
          </Card>

          <Card>
            <Typography.Title level={5}>Public Key</Typography.Title>
            <p className="mb-3">
              Klik tombol dibawah untuk menghasilkan public key
            </p>
            <Form.Item
              name="public_key"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Public key tidak boleh kosong!',
                },
              ]}
            >
              <Input.TextArea readOnly={false} />
            </Form.Item>

            <Space>
              <Button type="primary">Buat Public Key</Button>
              <Button>Copy ke clipboard</Button>
            </Space>
          </Card>

          <Card>
            <Typography.Title level={5}>IP Server</Typography.Title>
            <p className="mb-3">IP Server untuk memvalidasi sistem</p>
            <Form.Item
              name="callbackIP"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'IP Server tidak boleh kosong!',
                },
                {
                  validator: validateIpAddress,
                },
              ]}
            >
              <Input max={255} placeholder="Contoh: 192.168.1.1" />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button
              htmlType="submit"
              className="h-[44px] w-[220px]"
              type="primary"
              loading={isLoading || loadingUpdate}
            >
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(FormSupplier));
