import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import OpeningPage from "./components/OpeningPage";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import NewPassword from "./components/NewPassword";
import Confirm from "./components/Confirm";
import Overview from "./components/Overview";
import Details from "./components/details/Details";
import Form from "./components/Form";
import NewForm from "./components/new-form/NewForm";

const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={OpeningPage}/>
        <Route exact path="/Overview" component={Overview}/>
        <Route exact path="/Details" component={Details}/>
        <Route exact path="/NewForm" component={NewForm}/>
        <Route exact path="/Form" component={Form}/>
        <Redirect to="/Overview"/>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={OpeningPage}/>
        <Route exact path="/CreateAccount" component={CreateAccount}/>
        <Route exact path="/SignIn" component={SignIn}/>
        <Route exact path="/NewPassword" component={NewPassword}/>
        <Route exact path="/Confirm" component={Confirm}/>
        <Route exact path="/Form" component={Form}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
}

export default useRoutes;
