import React from "react";

import Error from "./tools/Error";

import useHttp from "../hooks/http.hook"

import "../styles/forms.css";

const CreateAccount = (props) => {

  const { request, error, clearError } = useHttp();

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const create = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/auth/register", "POST", userData);
      if (response) props.history.push({pathname: "SignIn"});
    } catch (err) {} // ignore
  }

  return (
    <div className="forms">
      {Error(error, clearError)}
      <div className="input-area">
        <h2>Create account</h2>
        <form autoComplete="off">
          <input type="email" onChange={(e) => setUserData({...userData,  email: e.target.value })} placeholder="Email"/>
          <input type="password" onChange={(e) => setUserData({...userData, password: e.target.value })} placeholder="Password"/>
          <input type="password" onChange={(e) => setUserData({...userData, confirmPassword: e.target.value })} placeholder="Confirm password"/>
          <input type="submit" value="Create" onClick={(e) => create(e)}/>
        </form>
        <span className="a-right" onClick={() => props.history.push({pathname: "SignIn"})}>Sign in</span>
      </div>
    </div>
  );
}

export default CreateAccount;
