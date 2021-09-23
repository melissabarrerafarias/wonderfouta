import React, { useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [data, setData] = useState({ user: undefined, token: undefined });
  const checkToken = async () => {
    try {
      let token = await localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return <div>Hello Login</div>;
};

export default Login;


// use this code in every protected page
// import { useHistory } from "react-router-dom";
// const history = useHistory();
// const { data } = useContext(UserContext);

// useEffect(() => {
//   if (!data.user) {
//     history.push("/login");
//   }
// }, [data.user, history]);
