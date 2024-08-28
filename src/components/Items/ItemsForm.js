import { Button, Form, Input, InputNumber, Space } from "antd";
import React from "react";
import getCurrentUser from "services/get-user";

const ItemsForm = ({
  submitHandler,
  loadings,
  name,
  description,
  editData,
  editHandler,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    if (!editData) {
      const currentUser = getCurrentUser();
      console.log({ currentUser });
      // values.driverId = currentUser.user._id;
      // values.currentLocation = [12, 45];

      submitHandler(values, form);
    } else {
      values._id = editData._id;
      editHandler(values, form);
    }
  };

  return (
    <Form
      form={form}
      key={editData?._id}
      name="basic"
      initialValues={{
        remember: true,
        name: editData?.name || "",
        description: editData?.description || "",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        labelCol={{ span: 24, offset: 0 }}
        labelAlign="left"
       
        label="Item Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please Enter Item name!",
          },
        ]}
      >
        <Input  placeholder="Enter Item Name"/>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 24, offset: 0 }}
        labelAlign="left"
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please Enter Price!",
          },
          {
            type: 'number',
            min: 0,
            message: 'Price must be a positive number!',
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter price"
          min={0}
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 18,
          span: 10,
        }}
      >
        <Space size={8}>
          <Button onClick={handleCancel}>Cancel</Button>
          {editData ? (
            <Button type="primary" htmlType="submit" loading={loadings}>
              Confirm
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" loading={loadings}>
              Submit
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};
export default ItemsForm;
