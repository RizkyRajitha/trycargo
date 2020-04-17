import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class LoginCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard/customer");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard/customer");
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, "customer");
  }

  render() {
    return (
      <div>
        <div className="row">
          <div
            className="container"
            style={{
              position: "relative",
              padding: "10% 15% 20% 15%",
            }}
          >
            <div className="row">
              <div className="col s12">
                <div className="row"></div>
                <div className="row center-align">
                  <h5>LOG IN</h5>
                  <h6>Log in to your account to place an order!</h6>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        id="email"
                        type="email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        id="password"
                        type="password"
                      />
                      <label htmlFor="password">Password</label>
                      <div>
                        <Link to="/authorization/resetpassword">
                          <b>Forgot Password?</b>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row center">
                    <button
                      type="submit"
                      className="waves-effect waves-light btn grey darken-3"
                    >
                      Log in
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

LoginCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginCustomer);
