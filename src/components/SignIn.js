import React from "react";
import {withRouter} from 'react-router-dom';

import "../styles/forms.css";

class SignIn extends React.Component {
  render() {
    return (
      <div className="forms">
        <div className="input-area">
          <h2>Sign in!</h2>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <input type="submit" value="Sign In"/>
          <span className="a-left" onClick={() => this.props.history.push({pathname: "CreateAccount"})}>Create account</span>
          <span className="a-right" onClick={() => this.props.history.push({pathname: "NewPassword"})}>Forgot password?</span>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
