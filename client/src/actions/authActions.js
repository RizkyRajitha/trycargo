import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";

//Action  for register
export const registerUser = (userData, history) => (dispatch) => {
  console.log(userData, history);
  axios
    .post("/reg/signupcustomer", userData)
    .then((res) => {
      history.push("/");
    })
    .catch((err) => console.log(err));
};

//Action for login
export const loginUser = (userData) => (dispatch) => {
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
