import "App.less";

import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DollarCircleOutlined,
  UserOutlined,
  TeamOutlined,
  LineChartOutlined,
  SolutionOutlined,
  UserSwitchOutlined,
  BarcodeOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import getCurrentUser from "services/get-user";
import ItemsPage from "pages/ItemPage";
import SummaryPage from "pages/SummaryPage";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState(location.pathname);
  const user = getCurrentUser();

  const items = [
    getItem("Dashboard", "/", <LineChartOutlined />),

    getItem("Items", "/items", <TeamOutlined />),

    getItem("Report", "/summary", <LineChartOutlined />),


  ];



  const changeMenu = (e) => {

    navigate(e.key);

  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }


  useEffect(() => {

    setPath(location?.pathname);

  }, [location]);


  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />

      <Menu
        onClick={changeMenu}
        theme="dark"
        selectedKeys={[path]}
        defaultSelectedKeys={["/"]}
        mode="inline"
        items={items}
      ></Menu>
    </Sider>
  );
};





export default Sidebar;
