import { Button, Table } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import useCafeteriaStore from "stores/adminStore";

const ItemsTable = ({ toggleEditMode, currentUser }) => {
  const items = useCafeteriaStore((state) => state.items);

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        console.log('record: ', record);
        
        return (
        <Button
          icon={<EditOutlined />}
          onClick={() => toggleEditMode(record.id)}
          size="small"
        >
        </Button>
      )},
    },
  ];

  return (
    <Table
      rowClassName="rowFontColor"
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey="id"
    />
  );
};

export default ItemsTable;
