import React from "react";

import Loader from "./tools/Loader";
import Error from "./tools/Error";

import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

import "../styles/forms.css";

const SignIn = (props) => {

  const auth = React.useContext(AuthContext);
  const { request, error, clearError, loading } = useHttp();

  const [userData, setUserData] = React.useState({
    email: "",
    password: ""
  });


  const signIn = async (e) => {
    e.preventDefault();
    try {
      const data = await request("/auth/login", "POST", userData);
      auth.login(data.token, data.userId);
    } catch (err) {} // ignore
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="forms">
      {Error(error, clearError)}
      <div className="input-area">
        <h2>Sign in!</h2>
        <form autoComplete="off">
          <input type="email" onChange={(e) => setUserData({...userData,  email: e.target.value })} placeholder="Email"/>
          <input type="password" onChange={(e) => setUserData({...userData, password: e.target.value })} placeholder="Password"/>
          <input type="submit" value="Sign In" onClick={(e) => signIn(e)}/>
        </form>
        <span className="a-left" onClick={() => props.history.push({pathname: "CreateAccount"})}>Create account</span>
        <span className="a-right" onClick={() => props.history.push({pathname: "NewPassword"})}>Forgot password?</span>
      </div>
    </div>
  );
}

export default SignIn;
