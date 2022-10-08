import './App.css';
import LoginForm from './components/login';
import { SiteTemplateHeader } from './components/header';
import { login, isLoggedIn, isAdmin } from './actions/userActions';
import { useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './components/home';
import PrivateRoute from './components/privateRoute';
import Tournaments from './components/tournaments';
import Admin from './components/admin';
import NewTournament from './components/newTournament';

const App = (props) => {

  const [appUser, setAppUser] = useState({ loggedIn: false });
  const loginPath = "/login";

  const loginHandler = (username, password) => {
    const user = { loggedIn: false };
    login(user, username, password);

    setAppUser(user);
  }

  const logoutHandler = () => {
    setAppUser({ loggedIn: false });
    console.log("User logged out.");
  }

  return (
    <BrowserRouter history={ props.history }>
      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={ <SiteTemplateHeader user={ appUser } logoutHandler={ logoutHandler } /> }
          >
            <Route 
              path={loginPath} 
              element={ <LoginForm user={ appUser } login={ loginHandler } /> } 
            />
            <Route 
              path="/home"
              element={ <PrivateRoute redirectPath={loginPath} accessRequirement={ isLoggedIn(appUser) } protectedComponent={ <Home /> } /> }
            />
            <Route
              path="/tournaments/new"
              element={ <PrivateRoute redirectPath={loginPath} accessRequirement={ isLoggedIn(appUser) } protectedComponent={ <NewTournament /> } /> }
            />
            <Route 
              path="/tournaments"
              element={ <PrivateRoute redirectPath={loginPath} accessRequirement={ isLoggedIn(appUser) } protectedComponent={ <Tournaments /> } /> }
            >
            </Route>
            <Route
              path="/admin"
              element={ <PrivateRoute redirectPath="/home" accessRequirement={ isAdmin(appUser) } protectedComponent={ < Admin /> } /> }
            />
            <Route 
              path=""
              element={ <Navigate to="/home" />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
