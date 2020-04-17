import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import { SET_CURRENT_USER, GET_ERRORS } from "./types";

//Action  for register
export const registerUser = (userData, history, userType) => (dispatch) => {
  if (userType === "customer") {
    axios
      .post("/reg/signupcustomer", userData)
      .then((res) => {
        history.push("/authorization/customer/login");
      })
      .catch((err) => console.log(err));
  }
  if (userType === "supplier") {
    axios
      .post("/reg/signupowner", userData)
      .then((res) => {
        history.push("/authorization/supplier/login");
      })
      .catch((err) => console.log(err));
  }
};

//Action for login
export const loginUser = (userData, userType) => (dispatch) => {
  if (userType === "customer") {
    axios
      .post("/auth/logincustomer", userData)
      .then((res) => {
        //Save token to localstorage
        const { token } = res.data;
        //Set token to localstorage
        localStorage.setItem("jwtToken", token);
        //Set token to Authorization header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (userType === "supplier") {
    axios
      .post("/auth/loginshopowner", userData)
      .then((res) => {
        //Save token to localstorage
        const { token } = res.data;
        //Set token to localstorage
        localStorage.setItem("jwtToken", token);
        //Set token to Authorization header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//Action for reset password
export const resetPassword = (email) => (dispatch) => {
  console.log(email);
  axios
    .post("/auth/forgotpasswordcustomer", { email })
    .then((res) => {
      Swal.fire("Check your mail to reset password");
    })
    .catch((err) => console.log(err));
};

export const newPassword = (data) => (dispatch) => {
  axios
    .post("/auth/resetpasswordcustomer", data)
    .then((res) => {
      Swal.fire("Log in with your new password");
    })
    .catch((err) => console.log(err));
};

//Action for logout
export const logoutUser = () => (dispatch) => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove Authorization header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
