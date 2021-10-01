import React from "react";
import "./ContactForm.css";
import Register from "./pages/Register";

function ContactForm() {
  return (
    <>
      <div className="contact-container">
        <form className="registerForm">
          <p className="registerHeader">Register</p>
        </form>
      </div>

      <Register />
    </>
  );
}

export default ContactForm;
