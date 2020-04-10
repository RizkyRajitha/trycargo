import React, { Component } from "react";

//Import Register and Login Models
import Register from "./Register";
import Login from "./Login";

//Import Logo
import logo from "../../images/logo2.png";

class CreateUser extends Component {
  render() {
    console.log(this.props);
    const { history } = this.props;
    const displayModal = (
      <div>
        <div id="signup" className="col s12 white">
          <Register history={history} userType={this.props.userType} />
        </div>
        <div id="login" className="col s12 white">
          <Login userType={this.props.userType} />
        </div>
      </div>
    );
    return (
      <div>
        <div className="modal-content white">
          <div className="row">
            <div className="col s12">
              <div className="row center card hide-on-med-and-down">
                <div className="logo">
                  <img src={logo} />
                </div>
              </div>
              <ul className="tabs">
                <li className="tab col s6">
                  <a href="#signup">Sign Up</a>
                </li>
                <li className="tab col s6">
                  <a href="#login">Log In</a>
                </li>
              </ul>
            </div>
          </div>
          {displayModal}
        </div>
      </div>
    );
  }
}

export default CreateUser;
