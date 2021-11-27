import React from "react";

import Loader from "./tools/Loader";
import Error from "./tools/Error";

import useHttp from "../hooks/http.hook"

import "../styles/forms.css";

const Confirm = (props) => {

  const { request, error, clearError, loading } = useHttp();

  const queryString = require('query-string');
  const parsed = queryString.parse(props.history.location.search);
  const userData = {
    id: parsed.id,
    encryptedPassword: parsed.encryptedPassword
  };

  const changePassword = async () => {
    try {
      const response = await request("/auth/changePassword", "POST", userData);
      if (response) props.history.push({pathname: "SignIn"});
    } catch (err) {} // ignore
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="forms">
      {Error(error, clearError)}
      <h2 className="notice" onClick={() => changePassword()}>
        <u style={{cursor: "pointer"}}>Click to confirm and sign in.</u>
      </h2>
    </div>
  );
}

export default Confirm;
