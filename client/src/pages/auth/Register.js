import React, { useState } from "react";
import { auth } from "../../firebase";
import FromGroup from "../../components/form/FromGroup";
import { toast } from "react-toastify";
function Register() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const RegistrationForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title">React Register</h1>
      <FromGroup
        id="email"
        label="Email"
        type="email"
        name="email"
        value={email}
        placeholder="Nhập email..."
        autoFocus={true}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-register">
        Register
      </button>
    </form>
  );

  return <div className="container">{RegistrationForm()}</div>;
}
export default Register;
