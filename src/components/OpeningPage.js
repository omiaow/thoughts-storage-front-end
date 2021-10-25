import React from "react";

import "../styles/opening-page.css";

const NavigationBar = (props) => {
  const isAuthenticated = !!localStorage.getItem("userData");

  return (
    <div className="opening-screen">
      <div className="developer-description">
        <h1>Developers</h1>
        <p>Create questionnaire and receive GET and POST requests of your survey.</p>
        <button onClick={() => props.history.push({pathname: (isAuthenticated) ? "/NewForm" : "/SignIn"})}>Get Started</button>
      </div>
      <div className="developer-description">
        <h1>Users</h1>
        <p>Create feedback, survey, questionnaire and see the table and statistics of your survey.</p>
        <button onClick={() => props.history.push({pathname: (isAuthenticated) ? "/NewForm" : "/SignIn"})}>Get Started</button>
      </div>
    </div>
  );
}

export default NavigationBar;
