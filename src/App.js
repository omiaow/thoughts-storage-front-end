import { BrowserRouter } from 'react-router-dom';
import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import AuthContext from "./context/AuthContext";

import NavigationBar from "./components/NavigationBar";
import Loader from "./components/tools/Loader";

import "./styles/app.css";
import "./styles/colors.css";

function App() {

  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <BrowserRouter>
        <div data-theme="dark">
          <NavigationBar/>
          <main>{ routes }</main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
