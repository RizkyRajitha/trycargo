import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../actions/authActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
class RegisterCustomer extends Component {
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
      Addressline1: "",
      Addressline2: "",
      city: "",
      postalcode: "",
      district: "",
      districtlist: [],
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
      Addressline1: this.state.Addressline1,
      Addressline2: this.state.Addressline2,
      city: this.state.city,
      district: this.state.district,
      postalcode: this.state.postalcode,
      password: this.state.password,
    };
    console.log(newUser);

    axios
      .post("/reg/signupcustomer", newUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "success") {
          this.props.history.push("/authorization/customer/login");
        } else if (res.data.msg === "dupuser") {
          Swal.fire("Duplicate User", "This email is Already taken", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Server Err", "error");
      });

    // this.props.registerUser(newUser, this.props.history, "customer");
  }

  componentDidMount() {
    axios
      .get("/util/getdistrictlist")
      .then((result) => {
        // console.log(result.data.districtlist);
        var distlist = result.data.districtlist.map((ele) => {
          return { label: ele, value: ele };
        });
        // console.log(distlist);
        this.setState({ districtlist: distlist });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangedistrict = (selectedOption) => {
    this.setState({ district: selectedOption.label });
  };

  render() {
    return (
      <div className="center-align">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col s10 offset-s1">
                <div className="row"></div>
                <div className="row center-align">
                  <div className="card-title">
                    <h5>SIGN UP</h5>
                  </div>
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
                        value={this.state.Addressline1}
                        onChange={this.onChange}
                        name="Addressline1"
                        type="text"
                      />
                      <label htmlFor="Addressline1">Address line 1</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.Addressline2}
                        onChange={this.onChange}
                        name="Addressline2"
                        type="text"
                      />
                      <label htmlFor="Addressline2">Address line 2</label>
                    </div>
                  </div>{" "}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.city}
                        onChange={this.onChange}
                        name="city"
                        type="text"
                      />
                      <label htmlFor="city">City</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <Select
                        options={this.state.districtlist}
                        onChange={this.handleChangedistrict}
                      />
                      {/* <label>District</label> */}
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
                      <label htmlFor="deliveryAddress">Postal code</label>
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

RegisterCustomer.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { registerUser })(
  withRouter(RegisterCustomer)
);
