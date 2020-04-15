import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";

export const addItem = (itemData, history) => (dispatch) => {
  axios
    .post("/apiowner/addnewitem", itemData)
    .then((res) => {
      console.log("Item addded successfully");
    })
    .catch((err) => console.log(err));
};
