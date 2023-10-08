import { Button, Card, Form, Input, Space, Typography } from 'antd';
import dynamic from 'next/dynamic';

import { HeadCustom } from '@/components/reuse/header.reuse';
import UriHookState from '@/components/reuse/UriHookState';

const FormSupplier = () => {
  const [form] = Form.useForm();
  const uriData = UriHookState();
  const pageData = uriData?.data;

  const updateData = pageData || null;
  const titlePage = updateData ? 'Update Supplier' : 'Tambah Supplier';

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
        <Form form={form} className="space-y-4">
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
              name="secretkey"
              className="w-full"
              initialValue={'BHAwZnDTgMvGBj4chSPvxo'}
              rules={[
                {
                  required: true,
                  message: 'Secret key tidak boleh kosong!',
                },
              ]}
            >
              <Input.TextArea readOnly />
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
              name="publickey"
              className="w-full"
              initialValue={'BHAwZnDTgMvGBj4chSPvxo'}
              rules={[
                {
                  required: true,
                  message: 'Public key tidak boleh kosong!',
                },
              ]}
            >
              <Input.TextArea readOnly />
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
              name="ipserver"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Public key tidak boleh kosong!',
                },
              ]}
            >
              <Input readOnly max={255} placeholder="Contoh: 192.168.1.1" />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button className="h-[44px] w-[220px]" type="primary">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(FormSupplier));
