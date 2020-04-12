import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      deliveryaddress: "",
      phone: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      deliveryAddress: this.state.deliveryAddress,
      password: this.state.password,
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="row"></div>
                <div className="row center-align">
                  <h5>SIGN UP</h5>
                  <h6>Create your account to place an order!</h6>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.name}
                        onChange={this.onChange}
                        name="firstname"
                        type="text"
                      />
                      <label htmlFor="name">First Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.name}
                        onChange={this.onChange}
                        name="lastname"
                        type="text"
                      />
                      <label htmlFor="name">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.deliveryAddress}
                        onChange={this.onChange}
                        name="deliveryAddress"
                        type="text"
                      />
                      <label htmlFor="deliveryAddress">
                        Address of drop point
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.phone}
                        onChange={this.onChange}
                        name="phone"
                        type="text"
                      />
                      <label htmlFor="phone">Contact Number</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        type="email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        type="password"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.password2}
                        onChange={this.onChange}
                        name="password2"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password2">Confirm Password</label>
                      {this.state.password !== this.state.password2 && (
                        <span className="red-text">Passwords must match</span>
                      )}
                    </div>
                  </div>
                  <div className="row center">
                    <button
                      type="submit"
                      disabled={
                        this.state.password !== this.state.password2
                          ? true
                          : false
                      }
                      className="waves-effect waves-light btn grey darken-3"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { registerUser })(withRouter(Register));
