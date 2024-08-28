import { PageHeader, Space, Modal, Skeleton } from "antd";

import React, { useEffect, useState } from "react";




const Payments= () => {
  const [desc, setDesc] = useState("");
  const [descVisible, setDescVisible] = useState(false);

  const [cardLoading, setcardLoadings] = useState(false);


 


  const handleCancel = () => {
    setDescVisible(false);
  };

  return (
    <>
      <Modal
        className="customModal"
        width={800}
        cancelButtonProps={{ style: { display: "none" } }}
        style={{ marginRight: "16rem", borderBottom: "none" }}
        title={"Description"}
        visible={descVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <h4>{desc}</h4>
      </Modal>

      <Space align="baseline" direction="horizontal">
        <PageHeader
          className="site-page-header"
          style={{ padding: 0, marginTop: -15 }}
          title="Payments"
        />
      </Space>

      <Skeleton active loading={cardLoading} />
      <Space size={20} direction="horizontal" wrap>
      
      </Space>
    </>
  );
};

export default Payments;
