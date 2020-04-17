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
      addressline1: "",
      addressline2: "",
      city: "",
      district: "",
      postalcode: "",
      country: "",
      workinghours: "",
      phone: "",
      email: "",
      aboutus: "",
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
      addressline1: this.state.addressline1,
      addressline2: this.state.addressline2,
      city: this.state.city,
      district: this.state.district,
      postalcode: this.state.postalcode,
      country: this.state.country,
      aboutus: this.state.aboutus,
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
                      <textarea
                        value={this.state.aboutus}
                        onChange={this.onChange}
                        name="aboutus"
                        class="materialize-textarea"
                      ></textarea>
                      <label htmlFor="aboutus">About</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.addressline1}
                        onChange={this.onChange}
                        name="addressline1"
                        type="text"
                      />
                      <label htmlFor="addressline1">Address Line 1</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.addressline2}
                        onChange={this.onChange}
                        name="addressline2"
                        type="text"
                      />
                      <label htmlFor="addressline2">Address Line 2</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.city}
                        onChange={this.onChange}
                        name="city"
                        type="text"
                      />
                      <label htmlFor="city">city</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.district}
                        onChange={this.onChange}
                        name="district"
                        type="text"
                      />
                      <label htmlFor="district">District</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.postalcode}
                        onChange={this.onChange}
                        name="postalcode"
                        type="text"
                      />
                      <label htmlFor="postalcode">Zip/Postal Code</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.country}
                        onChange={this.onChange}
                        name="country"
                        type="text"
                      />
                      <label htmlFor="country">Country</label>
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
