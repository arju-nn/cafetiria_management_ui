import React from "react";
import ErrorSvg from "assets/ErrorSvg";
import { Space } from "antd";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {

        return { hasError: true };
    }


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return(

       

                    <div style={{display:'flex',alignContent:'center',justifyContent:'center', width: '100vw', height: '100vh',backgroundColor:'white' }} >
                    <Space>
                  
                        <div style={{ width: "20rem" }} > <ErrorSvg />  </div>
                        <h1  style={{marginLeft:'20rem',fontWeight:'bolder',fontSize:'3rem'}} >Sorry, Something went wrong!.</h1>
                    </Space>
                    </div>

         
                
            
              
                )


        }

        return this.props.children;
    }
}

export default ErrorBoundary