import React from "react";
import {withRouter} from 'react-router-dom';

import "../styles/navigation-bar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <header>
        <h1 onClick={() => console.log(this.props.history.push({pathname: "/"}))}>Thought Storage</h1>
        <a href="/SignIn">Sign in</a>
      </header>
    );
  }
}

export default withRouter(NavigationBar);
