import React from "react";

import Loader from "./tools/Loader";
import Error from "./tools/Error";

import useHttp from "../hooks/http.hook"

import "../styles/forms.css";

const NewPassword = (props) => {

  const { request, error, clearError, loading } = useHttp();

  const [submit, setSubmit] = React.useState(false);

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const create = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/auth/newPassword", "POST", userData);
      if (response) setSubmit(true);
    } catch (err) {} // ignore
  }

  const renderResetForm = () => {
    return (
      <div className="input-area">
        <h2>Reset password</h2>
        <form autoComplete="off">
          <input type="email" onChange={(e) => setUserData({...userData,  email: e.target.value })} placeholder="Email"/>
          <input type="password" onChange={(e) => setUserData({...userData, password: e.target.value })} placeholder="New password"/>
          <input type="password" onChange={(e) => setUserData({...userData, confirmPassword: e.target.value })} placeholder="Confirm password"/>
          <input type="submit" value="Create" onClick={(e) => create(e)}/>
        </form>
        <span className="a-right" onClick={() => props.history.push({pathname: "SignIn"})}>Sign in</span>
      </div>
    );
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="forms">
      {Error(error, clearError)}
      {(!submit) ? renderResetForm() : <h2 className="notice">Check your email to comfirm a new password.</h2>}
    </div>
  );
}

export default NewPassword;
