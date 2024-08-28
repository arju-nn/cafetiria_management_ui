import { Button, Card, Col, PageHeader, Skeleton, Statistic } from "antd";
import React, { useEffect, useState } from "react";


import getCurrentUser from "services/get-user";

const DashBoard = () => {

  
  const user = getCurrentUser()
  // user.user={

  //   name:'pranav',
  //   email:'p@g.com',
  //   phone:894336323
  // }
  console.log(user);
  useEffect(() => {
    setLoading(false);
 
  }, []);

  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const refresh = () => {
    setRefreshLoading(true);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        style={{ padding: 0, marginTop: -15 }}
        title="Profile"
        extra={[
          <Button
    
            loading={refreshLoading}
            onClick={refresh}
            key="1"
            type="dashed"
          ></Button>,
        ]}
      />
      <div
        style={{
          margin: "0 auto",
          display: "flex",
        }}
        className="site-statistic-demo-card"
      >
        <Col span={6}>
          <Card
            loading={loading}
            style={{
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "1px 3px 15px -4px rgba(0,0,0,0.15)",
              margin: ".5rem",
            }}
          >
            <Statistic
              title=" Name"
              value={user?.user?.name}
              valueStyle={{
                color: "#black",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card
            loading={loading}
            style={{
              border: "none",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "1px 3px 15px -4px rgba(0,0,0,0.15)",
              margin: ".5rem",
            }}
          >
            <Statistic
              title={"Email"}
              style={{
                alignContent: "center",
                justifyContent: "center",
                border: "none",
                textAlign: "center",
              }}
              value={user?.user?.email}
              valueStyle={{
                color: "#black",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card
            loading={loading}
            style={{
              border: "none",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "1px 3px 15px -4px rgba(0,0,0,0.15)",
              margin: ".5rem",
            }}
          >
            <>
              <Statistic
                title={"Phone"}
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  border: "none",
                  textAlign: "center",
                }}
                value={user?.user?.phone}
                valueStyle={{
                  color: "#black",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            </>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            loading={loading}
            style={{
              border: "none",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "1px 3px 15px -4px rgba(0,0,0,0.15)",
              margin: ".5rem",
            }}
          >
            <>
              <Statistic
                title={"Total Amount"}
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  border: "none",
                  textAlign: "center",
                }}
                value={[]}
                valueStyle={{
                  color: "#black",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            </>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default DashBoard;
