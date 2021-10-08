import React from "react";
import {withRouter} from 'react-router-dom';

import "../styles/navigation-bar.css";

class NavigationBar extends React.Component {

  renderButton = (location) => {
    if (location === "/") {
      return <span onClick={() => this.props.history.push({pathname: "/SignIn"})}>Sign in</span>
    } else if (location === "/Overview") {
      return <span onClick={() => this.props.history.push({pathname: "/"})}>Sign out</span>
    } else if (location === "/NewForm") {
      return <span onClick={() => this.props.history.push({pathname: "/Overview"})}>Overview</span>
    }
  }

  render() {
    return (
      <header>
        <h1 onClick={() => this.props.history.push({pathname: "/"})}>Thought Storage</h1>

        {this.renderButton(this.props.history.location.pathname)}
      </header>
    );
  }
}

export default withRouter(NavigationBar);
