import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateUser extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row center">
              <Link
                className="btn btn-large waves-effect waves-light grey darken-2"
                to="/authorization/supplier/login"
              >
                Login
              </Link>{" "}
              <Link
                className="btn btn-large waves-effect waves-light grey darken-2"
                to="/authorization/supplier/register"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
