import { Layout } from "antd";
import React from "react";
import getCurrentUser from "services/get-user";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Completelayout = () => {
  const user = getCurrentUser;
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider >
      <Sidebar></Sidebar>
      <Layout className="site-layout">
        <Header user={user}></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
      
    </Layout>
  );
};










export default Completelayout;
