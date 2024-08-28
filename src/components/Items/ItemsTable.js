import { Button, Input, Space, Table, Tooltip } from "antd";
import React from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import useCafeteriaStore from "stores/adminStore";


const ItemsTable = ({ toggleEditMode ,currentUser}) => {
  const items = useCafeteriaStore((state) => state.items);

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "0",
    
    },


    {
      title: "Item Price",
      dataIndex: "price",
      key: "1",
     
    },

   
  ];




  return (
    <>
      <Table
       rowClassName={'rowFontColor'}
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey={'id'}
      />
    </>
  );
};

export default ItemsTable;
