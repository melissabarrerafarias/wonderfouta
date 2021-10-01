import React, { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import UserContext from "../../context/UserContext";
import axios from "axios";

function Login() {
  return (
    <>
      <Navbar />
      <div>this is login</div>
      <Footer />
    </>
  );
}

export default Login;
