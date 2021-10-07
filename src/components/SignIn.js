import React from "react";

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
          <a className="a-left" href="CreateAccount">Create account</a>
          <a className="a-right" href="ForgotPassword">Forgot password?</a>
        </div>
      </div>
    );
  }
}

export default SignIn;
