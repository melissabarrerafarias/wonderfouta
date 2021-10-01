import React, { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
// import UserContext from "../../context/UserContext";
import axios from "axios";

function Register() {

  // token for future authentication
//   const [data, setData] = useState({ user: undefined, token: undefined });

  // determine user info before making signUp request
  const [user, setUser] = useState();

  // check for token in local storage, set empty string if none
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


  // setUser with all values of form as the user types it
  const onChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // upon submitting form, get all info from state, tidy it up and make the request to https://localhost:5000/user/signUp
  const getFormInfo = async (e) => {
    try {
      e.preventDefault();
      const address = `${user.street}, ${user.city}, ${user.state} ${user.postalCode}`;
      const officialInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: address,
        phone: parseInt(user.phone),
        storeCompany: user.storeCompany,
        website: user.website,
        password: user.password,
      };
      // console.log(officialInfo);
      const signUp = await axios.post("user/signUp", officialInfo);
      console.log(signUp);
    } catch (error) {
      console.log(error);
    }
  };


  // check for token in local storage on load
  useEffect(() => {
    checkToken();
  }, []);

  
  return (
    <>
      <form onSubmit={getFormInfo}>
        <ul>
          <li>
            <label>
              First Name:
              <input onChange={onChange} type="text" name="firstName" />
            </label>
          </li>
          <li>
            <label>
              Last Name:
              <input onChange={onChange} type="text" name="lastName" />
            </label>
          </li>
          <li>
            <label>
              Store or Company:
              <input onChange={onChange} type="text" name="storeCompany" />
            </label>
          </li>
          <li>
            <label>
              Address:
              <input
                onChange={onChange}
                type="text"
                name="street"
                placeholder="Street"
              />
              <input
                onChange={onChange}
                type="text"
                name="city"
                placeholder="City"
              />
              <input
                onChange={onChange}
                type="text"
                name="state"
                placeholder="State"
              />
              <input
                onChange={onChange}
                type="text"
                name="postalCode"
                placeholder="Postal Code"
              />
            </label>
          </li>
          <li>
            <label>
              Phone:
              <input onChange={onChange} type="number" name="phone" />
            </label>
          </li>

          <li>
            <label>
              Website:
              <input onChange={onChange} type="url" name="website" />
            </label>
          </li>
          <li>
            <label>
              Email:
              <input onChange={onChange} type="email" name="email" />
            </label>
          </li>
          <li>
            <label>
              Password:
              <input onChange={onChange} type="password" name="password" />
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

export default Register;

// use this code in every protected page
// import { useHistory } from "react-router-dom";
// const history = useHistory();
// const { data } = useContext(UserContext);

// useEffect(() => {
//   if (!data.user) {
//     history.push("/login");
//   }
// }, [data.user, history]);
