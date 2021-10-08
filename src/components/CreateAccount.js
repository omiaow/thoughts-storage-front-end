import React from "react";
import {withRouter} from 'react-router-dom';

import "../styles/forms.css";

class CreateAccount extends React.Component {
  render() {
    return (
      <div className="forms">
        <div className="input-area">
          <h2>Create account</h2>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <input type="password" placeholder="Confirm password"/>
          <input type="submit" value="Create"/>
          <span className="a-left" onClick={() => this.props.history.push({pathname: "SignIn"})}>Sign in</span>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateAccount);
