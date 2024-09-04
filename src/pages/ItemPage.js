import {
  Button,
  Divider,
  message,
  Modal,
  PageHeader,
  Skeleton,
} from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import useItemStore from "stores/adminStore";
import ItemsTable from "components/Items/ItemsTable";
import ItemsForm from "components/Items/ItemsForm";
import axios from "axios/axios";
import ItemService from "services/ItemService";

const ItemsPage = ({ currentUser }) => {
  const [visible, setVisible] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // Zustand Store
  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);
  const addItem = useItemStore((state) => state.addItem);
  const updateItem = useItemStore((state) => state.updateItem);
  const [refreshLoading, setRefreshLoading] = useState(false);

  // Notification
  const ItemAdded = (msg) => message.success(msg);
  const editSuccessful = (msg) => message.success(msg);
  const errorMsg = (msg) => message.error(msg);

  const addNewItem = () => {
    setEditData(null);
    setVisible(true);
  };

  const handleCancel = () => {
    setEditData(null);
    setVisible(false);
  };

  const toggleEditMode = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditData(itemToEdit);
    setVisible(true);
  };

  const submitHandler = async (values) => {
    try {
      let response;
      if (editData) {
        console.log('editData: ', editData);
        // Update existing item
        response = await ItemService.editItem(editData.id, values);
        console.log('response: ', response);
        updateItem(response.data); // Update the item in Zustand store
        editSuccessful("Item updated successfully");
      } else {
        // Add new item
        response = await ItemService.addItem(values);
        addItem(response); // Add the new item to Zustand store
        ItemAdded("Item added successfully");
      }
    } catch (error) {
      errorMsg(error.response?.data?.message || "Operation failed");
    } finally {
      setVisible(false); // Close the modal after operation
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      setTableLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (err) {
        errorMsg(err.response?.data?.message || "Failed to load items");
      } finally {
        setTableLoading(false);
      }
    };

    fetchItems();
  }, [setItems]);

  const refresh = async () => {
    setRefreshLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get("/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
      message.success("Items refreshed successfully");
    } catch (err) {
      errorMsg("Failed to refresh items");
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        style={{ padding: 0, marginTop: -15 }}
        title="Items"
        extra={[
          <Button
            icon={<RedoOutlined />}
            loading={refreshLoading}
            onClick={refresh}
            key="1"
            type="dashed"
          >
            Refresh
          </Button>,
        ]}
      />

      <Divider orientation="center">
        <Button type="primary" icon={<PlusOutlined />} onClick={addNewItem}>
          Add Item
        </Button>
      </Divider>

      {tableLoading ? (
        <Skeleton active loading={tableLoading} />
      ) : (
        <ItemsTable
          currentUser={currentUser}
          toggleEditMode={toggleEditMode}
        />
      )}

      <Modal
        destroyOnClose
        width={800}
        footer={null}
        title={editData ? "Edit Item Details" : "Enter Item Details"}
        visible={visible}
        onCancel={handleCancel}
      >
        <ItemsForm
          submitHandler={submitHandler}
          loadings={loadings}
          handleCancel={handleCancel}
          editData={editData} // Corrected prop name
        />
      </Modal>
    </div>
  );
};

export default ItemsPage;
