import NavigationBar from "./components/NavigationBar";
import OpeningPage from "./components/OpeningPage";
import NewPassword from "./components/NewPassword";
import CreateAccount from "./components/CreateAccount";
import NewForm from "./components/new-form/NewForm";

import "./styles/app.css";

function App() {
  return (
    <>
      <NavigationBar/>
      <main>
        <NewForm/>
      </main>{/*
      <main>
        <NewForm/>
      </main>*/}
    </>
  );
}

export default App;
