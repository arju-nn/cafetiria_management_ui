import { Button,Form, Input, message } from "antd";
import axios from "axios/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import SVG from 'assets/svg'

const Signup = () => {

  const [loading, setloading] = useState(false);
    const navigate = useNavigate()

  const loginError= (msg) => {
    message.error(msg);
  };

  const submitHandler = (values,form) => {


    setloading(true);

    try {
      axios
        .post("/drivers/signup", values)
        .then((resp) => {
          console.log(resp);
          
          setloading(false);
          navigate('/login')
        })
        .catch((err) => {
          console.log(err.response.data.message);
          loginError(err.response.data.message);
          setloading(false);

            
        });
    } catch (error) {
      console.log(error);
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
          email:'',
          password:''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <SVG style={{width:'5rem'}} ></SVG>
        <h1  style={{fontWeight:'bold',marginLeft:'7rem'}} >Signup</h1>
        <Form.Item
        
          style={{ marginTop: "1rem" }}
          label="Name"
          name="name"
        
        >
          <Input autoComplete="off"  type={"text"} style={{ width: "300px" }} />
        </Form.Item>
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
          label="Phone"
          name="phone"
         
        >
          <Input autoComplete="off" type={"number"} style={{ width: "300px" }} />
        </Form.Item>

        <Form.Item
          style={{ marginTop: "-1rem" }}
          label="Password"
          name="password"
         
        >
          <Input.Password autoComplete="off"value={'test'} style={{ width: "300px" }} />
        </Form.Item>
      
       

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button  style={{marginLeft:'-2rem',width:'6rem'}} loading={loading} type="primary" htmlType="submit">
         Signup
          </Button>
        </Form.Item>
      </Form>

    </div>
   
  );
};

export default Signup;
