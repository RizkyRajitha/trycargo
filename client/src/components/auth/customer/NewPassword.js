import React, { Component } from "react";
import { connect } from "react-redux";
//newPassword
import { newPassword } from "../../../actions/authActions";

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      password1: "",
      password2: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      password: this.state.password1,
      token: this.props.match.params.token,
    };
    this.props.newPassword(data);
  }
  render() {
    return (
      <div
        className="container"
        style={{
          position: "relative",
          padding: "15% 15% 20% 15%",
        }}
      >
        <div className="row">
          <div className="col s12">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="card grey lighten-3 center-align">
                <div className="card-content">
                  <h5>Enter your New Password</h5>
                  <input
                    className="input-field"
                    value={this.state.password1}
                    onChange={this.onChange}
                    style={{ width: "70%" }}
                    name="password1"
                    type="password"
                    id="password1"
                    placeholder="Password"
                  ></input>

                  <input
                    className="input-field"
                    value={this.state.password2}
                    onChange={this.onChange}
                    style={{ width: "70%" }}
                    name="password2"
                    type="password"
                    id="password2"
                    placeholder="Confirm Password"
                  ></input>
                  <div className="row">
                    {this.state.password1 !== this.state.password2 && (
                      <span className="red-text">Passwords must match</span>
                    )}
                  </div>
                </div>
                <div className="card-action">
                  <button
                    disabled={
                      this.state.password1 !== this.state.password2
                        ? true
                        : false
                    }
                    className="btn waves-effect waves-light blue"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("", { newPassword })(NewPassword);
