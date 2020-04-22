import axios from "axios";
import Swal from "sweetalert2";
import { UPDATE_PROFILE } from "./types";

export const updateProfile = (userData) => (dispatch) => {
  axios
    .post("/apiowner/owneredit", userData)
    .then((res) => {
      Swal.fire("Success", "Profile has been updated", "success");
      console.log(res);
      dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    })
    .catch((err) => console.log(err));
};
