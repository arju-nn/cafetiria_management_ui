import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin"));

    if (user) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt?.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
