import "./App.less";
import React, { useEffect, useState } from "react";
import getCurrentUser from "services/get-user"; 
import Login from "pages/login/login";
import Signup from "pages/login/signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Completelayout from "./layout/completeLayout";
import LoginLayout from "./layout/loginLayout";
import DashBoard from "pages/dashboard";
import AuthVerify from "utils/TokenVerify";
import SummaryPage from "services/SummaryService";
import ItemsPage from "pages/ItemPage";


const App = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  }, []);

  return (
    <>
     
     
        <>
          <Routes>
            <Route element={<Completelayout />}>
              <Route
                exact
                path="/"
                element={ <DashBoard />}
              />

       
              <Route 
                exact
              path="/items" element={<ItemsPage />} />
              <Route
                exact
              path="/summary" element={<SummaryPage/>} />

            
            </Route>
          </Routes>

          <AuthVerify />
        </>
   
   
       <>
          <Routes>
          
            <Route element={<LoginLayout />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
          </Routes>
        </> 
  
  
    </>
  );
};

export default App;
