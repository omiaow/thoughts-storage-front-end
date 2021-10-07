import React from "react";

import "../styles/forms.css";

class NewPassword extends React.Component {
  render() {
    return (
      <div className="forms">
        <div className="input-area">
          <h2>Reset password</h2>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="New password"/>
          <input type="password" placeholder="Confirm password"/>
          <input type="submit" value="Submit"/>
        </div>
      </div>
    );
  }
}

export default NewPassword;
