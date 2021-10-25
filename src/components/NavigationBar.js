import React from "react";
import {withRouter} from 'react-router-dom';

import AuthContext from "../context/AuthContext";

import "../styles/navigation-bar.css";

const NavigationBar = (props) => {

  const auth = React.useContext(AuthContext);

  const renderButton = (location) => {
    if (location === "/") {
      return (auth.isAuthenticated) ? <span onClick={() => props.history.push({pathname: "/Overview"})}>Overview</span> :
                                      <span onClick={() => props.history.push({pathname: "/SignIn"})}>Sign in</span>;
    } else if (location === "/Overview") {
      return <span onClick={() => auth.logout()}>Sign out</span>
    } else if (location === "/NewForm" || location === "/Details") {
      return <span onClick={() => props.history.push({pathname: "/Overview"})}>Overview</span>
    }
  }

  return (
    <header>
      <h1 onClick={() => props.history.push({pathname: "/"})}>Thoughts Storage</h1>
      {renderButton(props.history.location.pathname)}
    </header>
  );
}

export default withRouter(NavigationBar);
