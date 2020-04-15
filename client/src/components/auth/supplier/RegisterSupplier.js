import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../actions/authActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class RegisterSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buisnessname: "",
      username: "",
      buisnessphone: "",
      buisnessaddress: "",
      deliveryaddress: "",
      businessdistrict: "",
      workinghours: "",
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
      buisnessname: this.state.buisnessname,
      username: this.state.username,
      buisnessphone: this.state.buisnessphone,
      buisnessaddress: this.state.buisnessaddress,
      businessdistrict: this.state.businessdistrict,
      workinghours: this.state.workinghours,
      email: this.state.email,
      buisnessphone: this.state.phone,
      password: this.state.password,
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history, "supplier");
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
                  <h6>Create your account to start a supply depot!</h6>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.buisnessname}
                        onChange={this.onChange}
                        name="buisnessname"
                        type="text"
                      />
                      <label htmlFor="buisnessname">Buisness Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.username}
                        onChange={this.onChange}
                        name="username"
                        type="text"
                      />
                      <label htmlFor="username">User Name</label>
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
                        value={this.state.buisnessaddress}
                        onChange={this.onChange}
                        name="buisnessaddress"
                        type="text"
                      />
                      <label htmlFor="buisnessaddress">Address</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.workinghours}
                        onChange={this.onChange}
                        name="workinghours"
                        type="text"
                      />
                      <label htmlFor="workinghours">Working Hours</label>
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

RegisterSupplier.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { registerUser })(
  withRouter(RegisterSupplier)
);
