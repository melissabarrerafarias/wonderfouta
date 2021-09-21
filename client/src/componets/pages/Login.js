import React, { useEffect } from "react";

const Login = () => {
  const checkToken = async () => {
    let token = await localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return <div>Hello Login</div>;
};

export default Login;
