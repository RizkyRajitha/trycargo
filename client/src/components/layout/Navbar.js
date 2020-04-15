import React, { Component } from "react";
import logo from "../../images/logo.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="grey darken-3">
            <div className="container">
              <div className="nav-wrapper">
                <a href="#home" className="brand-logo white-text">
                  <img src={logo}></img>
                </a>
                <a
                  href="#"
                  data-activates="mobile-nav"
                  className="button-collapse"
                >
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <a href="#home" className="white-text">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#search" className="white-text">
                      Search
                    </a>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <a
                        href="/"
                        onClick={this.props.logoutUser}
                        className="white-text"
                      >
                        Logout
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="#about" className="white-text">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="white-text">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <ul className="side-nav" id="mobile-nav">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#search">Search</a>
          </li>

          {isAuthenticated && (
            <li>
              <a
                href="/"
                onClick={this.props.logoutUser}
                className="white-text"
              >
                Logout
              </a>
            </li>
          )}

          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
