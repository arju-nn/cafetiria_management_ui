import { Button, Form, Input, message } from "antd";
import axios from "axios/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import SVG from 'assets/svg'

const Login = () => {

  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const loginError = (msg) => {
    message.error(msg);
  };

  const submitHandler = (values, form) => {


    setloading(true);

    try {
      axios
        .post('/api/auth/login', values)
        .then((resp) => {
          console.log('Response: ', resp);
  
          // Check if the response contains a token
          if (resp.data.token) {
            // Save the user and token in localStorage
            localStorage.setItem("admin", JSON.stringify(resp.data.user)); // Store user information
            localStorage.setItem("token", JSON.stringify(resp.data.token)); // Store token
  
            // Navigate based on user role
            if (resp.data.user.role === 'admin') {
              navigate('/items');
            } else {
              message.error("Login as an admin user");
            }
  
          } else {
            message.error("Invalid login response");
          }
  
          console.log('Updated Response: ', resp);
        })
        .catch((err) => {
          console.error('Login Error: ', err.response?.data?.message || err.message);
          loginError(err.response?.data?.message || 'An error occurred');
        })
        .finally(() => {
          setloading(false);
        });
    } catch (error) {
      console.error('Unexpected Error: ', error);
      setloading(false);
    }
  
  };

  const onFinish = (values) => {

    submitHandler(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (

    <div className="loginContainer" >
      <Form
        autocomplete="off"
        className="loginForm"


        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
          email: '',
          password: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        {/* <SVG style={{ width: '5rem' }} ></SVG> */}
        <h1 style={{ fontWeight: 'bold', marginLeft: '4rem', marginTop: '2rem' }} > Admin Login</h1>

        <Form.Item

          style={{ marginTop: "-1rem" }}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email Id!",
            },
          ]}
        >
          <Input autoComplete="off" type={"email"} style={{ width: "300px" }} />
        </Form.Item>


        <Form.Item
          style={{ marginTop: "-1rem" }}
          label="Password"
          name="password"

        >
          <Input.Password autoComplete="off" value={'test'} style={{ width: "300px" }} />
        </Form.Item>



        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ marginLeft: '-2rem', width: '6rem' }} loading={loading} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

    </div>

  );
};

export default Login;
