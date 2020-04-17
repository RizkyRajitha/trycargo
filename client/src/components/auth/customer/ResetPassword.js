import React, { Component } from "react";
import { connect } from "react-redux";
//resetPassword
import { resetPassword } from "../../../actions/authActions";

class ResetPassword extends Component {
  render() {
    const { resetPassword } = this.props;
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
            <div className="card grey lighten-3 center-align">
              <div className="card-content">
                <h5>Enter your email address to continue</h5>
                <input
                  className="input-field center-align"
                  style={{ width: "70%" }}
                  name="emailr"
                  type="email"
                  id="emailr"
                  placeholder="Email"
                ></input>
              </div>
              <div className="card-action">
                <button
                  onClick={() => {
                    resetPassword(document.getElementById("emailr").value);
                  }}
                  className="btn waves-effect waves-light blue"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("", { resetPassword })(ResetPassword);
