import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Action, useStore } from "../store/Store";
import { DataType } from "../interfaces";
import CreateOrEditPerson from "./CreateOrEditPerson";

const Home = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, deleteItem } = useStore();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (value) => (
        <span
          style={{
            textTransform: "capitalize",
            color: value === "female" ? "red" : "green",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      title: "City",
      dataIndex: "address",
      render: (address, record) => {
        if (!address) {
          console.log(record);
        }

        return address.city;
      },
    },
    {
      title: "Street",
      dataIndex: "address",
      render: (address) => address.street,
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Operations",
      dataIndex: "operations",
      render: (_, record) => (
        <>
          <button onClick={() => deleteItem(Action.DeleteItem, record.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DataType>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditItem(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ cursor: "pointer" }}
        onRow={(record) => ({
          onDoubleClick: () => setEditItem(record),
        })}
      />
      <Button type="primary" onClick={showModal}>
        Add Post
      </Button>

      <a
        href="/chart"
        target="_blank"
        style={{
          marginLeft: "20px",
          backgroundColor: "#fd6b6b",
          padding: "8px",
          textDecoration: "none",
          borderRadius: "50px",
          color: "#ffffff",
        }}
      >
        Chart
      </a>
      <Modal
        title="Add Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateOrEditPerson action={"create"} />
      </Modal>
      <Modal
        title="Edit Post"
        open={!!editItem}
        onCancel={handleCancel}
        footer={null}
      >
        {!!editItem && <CreateOrEditPerson action={"edit"} person={editItem} />}
      </Modal>
    </div>
  );
};

export default Home;
