import React from "react";

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
          <a className="a-left" href="SignIn">Sign in</a>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
