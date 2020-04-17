import axios from "axios";
import Swal from "sweetalert2";
import { SET_NEW_ITEM } from "./types";

export const addItem = (itemData, history) => (dispatch) => {
  axios
    .post("/apiowner/addnewitem", itemData)
    .then((res) => {
      Swal.fire("Success", "Item has been added to your store", "success");
      console.log(res);
      dispatch({ type: SET_NEW_ITEM, payload: res.data.data });
    })
    .catch((err) => console.log(err));
};
