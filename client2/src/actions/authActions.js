import axios from "axios";

import { SET_CURRENT_USER, GET_ERRORS } from "./types";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/register", userData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
