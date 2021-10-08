import React from "react";

import "../styles/opening-page.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="opening-screen">
        <div className="developer-description">
          <h1>Developers</h1>
          <p>Create feedback, survey, questionnaire or test foms and get your GET and POST requests. Or see the table and statistics of your survey.</p>
          <button>Get Started</button>
        </div>
        <div className="developer-description">
          <h1>Users</h1>
          <p>Create feedback, survey, questionnaire or test forms and see the table and statistics of your survey.</p>
          <button>Get Started</button>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
