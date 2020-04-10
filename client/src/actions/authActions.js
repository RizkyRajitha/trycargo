import axios from "axios";

import { SET_CURRENT_USER, GET_ERRORS } from "./types";

export const registerUser = (userData, history) => (dispatch) => {
  console.log(userData, history);
  axios
    .post("/signupcustomer", userData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => console.log("Error:" + err));
};
