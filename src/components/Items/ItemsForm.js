import { Button, Form, Input, InputNumber, Space } from "antd";
import React, { useEffect } from "react";
import getCurrentUser from "services/get-user";

const ItemsForm = ({
  submitHandler,
  loadings,
  editData,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Set form fields when editData is available
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        price: editData.price,
        description: editData.description,
      });
    } else {
      form.resetFields(); // Reset form when adding a new item
    }
  }, [editData, form]);

  const onFinish = (values) => {
    const currentUser = getCurrentUser();

    if (!editData) {
      // Add new item
      values.currentUser = currentUser;
      submitHandler(values, form);
    } else {
      // Edit existing item
      values._id = editData._id;
      submitHandler(values, form);
    }
  };

  return (
    <Form
      form={form}
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
        label="Item Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please Enter Item name!",
          },
        ]}
      >
        <Input placeholder="Enter Item Name" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please Enter Price!",
          },
          {
            type: "number",
            min: 0,
            message: "Price must be a positive number!",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter price"
          min={0}
          step={0.01}
        />
      </Form.Item>

      <Form.Item>
        <Space size={8}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loadings}>
            {editData ? "Confirm" : "Submit"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ItemsForm;
