import React, { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import UserContext from "../../context/UserContext";

function Login() {
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
  return (
    <>
      <form>
        <ul>
          <li>
            <label>
              First Name:
              <input type="text" name="firstName" />
            </label>
          </li>
          <li>
            <label>
              Last Name:
              <input type="text" name="lastName" />
            </label>
          </li>
          <li>
            <label>
              Email:
              <input type="text" name="email" />
            </label>
          </li>
          <li>
            <label>
              Store or Company:
              <input type="text" name="storeCompany" />
            </label>
          </li>
          <li>
            <label>
              Address:
              <input type="text" name="street" placeholder="Street" />
              <input type="text" name="city" placeholder="City" />
              <input type="text" name="state" placeholder="State" />
              <input type="text" name="postalCode" placeholder="Postal Code" />
            </label>
          </li>
          <li>
            <label>
              Phone:
              <input type="text" name="phone" />
            </label>
          </li>

          <li>
            <label>
              Website:
              <input type="text" name="website" value="https://" />
            </label>
          </li>
        </ul>

        <input type="submit" value="Submit" />
      </form>
      <Navbar />
      <Footer />
    </>
  );
}

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
