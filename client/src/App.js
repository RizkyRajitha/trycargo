import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

//Import CSS module
import "./App.css";

//login/logout due to existance/expiration of the token
import { setCurrentUser, logoutUser } from "./actions/authActions";

//Access module for private routes
import PrivateRoute from "./components/common/PrivateRoute";

//Import React Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import CustomerDashboard from "./components/dashboard/customer/CustomerDashboard";

import store from "./store";
import setAuthToken from "./utils/setAuthToken";

//Check for token
if (localStorage.jwtToken) {
  //Set the auth Token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    //Logout the User
    store.dispatch(logoutUser());
    //Redirect to landing
    window.location.href("/");
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard"
                component={CustomerDashboard}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
