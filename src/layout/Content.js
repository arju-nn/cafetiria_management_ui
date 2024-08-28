import React from "react";

import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const Content = () => {
  const { Content } = Layout;

  return (
    <Content
      style={{
        margin: "0 16px",
        overflowY: "scroll",
      }}
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        < Outlet></Outlet>
      </div>
    </Content>
  );
};

export default Content;
