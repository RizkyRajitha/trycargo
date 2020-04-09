import React from "react";

export default function Login({ userType }) {
  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="row"></div>
              <div className="row center-align">
                <h5>LOG IN</h5>
                <h6>Create your account to place an order!</h6>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" />
                  <label htmlFor="password">Password</label>
                  <div>
                    <a href="#">
                      <b>Forgot Password?</b>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row center">
                <a
                  href=""
                  className="modal-close waves-effect waves-light btn light-blue darken-3"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
