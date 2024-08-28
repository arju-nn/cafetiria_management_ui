import "../App.less";
import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "services/get-user";



const Header = () => {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { Header } = Layout;
  return (
    <Header
      className="site-layout-background"
      style={{
        marginBottom: 30,
        padding: 0,
        position: "relative !important",
        height: "3rem",
      }}
    >
      <>
        {user && (
          <div
            style={{
              marginTop: "-.4rem",
              width: "3rem",
              position: "absolute",
              right: "6rem",
            }}
          >
         <Button  onClick={logOut} >Logout</Button>
          </div>
        )}
      </>
    </Header>
  );
};

export default Header;
