import React from "react";

import "../styles/navigation-bar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <header>
        <h1>Thought Storage</h1>
        <button>Sign out</button> 
      </header>
    );
  }
}

export default NavigationBar;
