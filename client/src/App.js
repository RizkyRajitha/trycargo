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
import SupplierDashboard from "./components/dashboard/supplier/SupplierDashboard";

import CreateCustomer from "./components/auth/customer/CreateUser";
import CreateSupplier from "./components/auth/supplier/CreateUser";

import LoginCustomer from "./components/auth/customer/LoginCustomer";
import LoginSupplier from "./components/auth/supplier/LoginSupplier";

import RegisterCustomer from "./components/auth/customer/RegisterCustomer";
import RegisterSupplier from "./components/auth/supplier/RegisterSupplier";

import ResetPassword from "./components/auth/customer/ResetPassword";
import NewPassword from "./components/auth/customer/NewPassword";

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
  const currentTime = Date.now / (1000 * 60);
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
          <Route
            exact
            path="/authorization/customer"
            component={CreateCustomer}
          />
          <Route
            exact
            path="/authorization/customer/login"
            render={(props) => <LoginCustomer {...props} />}
          />
          <Route
            exact
            path="/authorization/customer/register"
            component={RegisterCustomer}
          />
          <Route
            exact
            path="/authorization/supplier"
            component={CreateSupplier}
          />
          <Route
            exact
            path="/authorization/supplier/login"
            component={LoginSupplier}
          />
          <Route
            exact
            path="/authorization/supplier/register"
            component={RegisterSupplier}
          />
          <Route
            exact
            path="/authorization/resetpassword"
            component={ResetPassword}
          />
          <Route exact path="/resetpassword/:token" component={NewPassword} />
          <div className="container">
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard/customer"
                component={CustomerDashboard}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard/supplier"
                component={SupplierDashboard}
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
