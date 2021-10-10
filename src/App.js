import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import OpeningPage from "./components/OpeningPage";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import NewPassword from "./components/NewPassword";
import Overview from "./components/Overview";
import Form from "./components/render-form/Form";
import NewForm from "./components/new-form/NewForm";

import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <main>
          <Switch>
            <Route exact path="/" component={OpeningPage}/>
            <Route exact path="/CreateAccount" component={CreateAccount}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/NewPassword" component={NewPassword}/>
            <Route exact path="/Overview" component={Overview}/>
            <Route exact path="/NewForm" component={NewForm}/>
            <Route exact path="/Form" component={Form}/>
          </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
