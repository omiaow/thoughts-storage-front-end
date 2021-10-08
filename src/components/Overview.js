import React from "react";
import {withRouter} from 'react-router-dom';

import "../styles/overview.css";

class Overview extends React.Component {
  render() {
    return (
      <div className="overview">
        <h2>Templates</h2>
        <div className="view">
          <span className="template">Website Feedback</span>
          <span className="template">Job Application</span>
          <span className="template">Event Registration</span>
          <span className="template">Online Order</span>
          <span className="template">Account Signup</span>
          <span className="template">Sales Contact</span>
        </div>
        <h2>Overview</h2>
        <div className="view">
          <span className="card" onClick={() => this.props.history.push({pathname: "/NewForm"})}>New Form</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Overview);
