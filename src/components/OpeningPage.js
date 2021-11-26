import React from "react";

import "../styles/opening-page.css";

const NavigationBar = (props) => {
  const isAuthenticated = !!localStorage.getItem("userData");

  return (
    <div className="opening-screen">
      <div className="developer-description">
        <h1>Developers and Guests!</h1>
        <p>Create feedback, survey, questionnaire and see the response and statistics of your survey. And if you are a developer, receive POST API request of your survey. Also, you can get React npm package to place the form on your web page.</p>
        <button onClick={() => props.history.push({pathname: (isAuthenticated) ? "/NewForm" : "/SignIn"})}>Get Started</button>
      </div>
    </div>
  );
}

export default NavigationBar;
