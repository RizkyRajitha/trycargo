import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import suppliesReducer from "./suppliesReducer.js";

export default combineReducers({
  auth: authReducer,
  supplies: suppliesReducer,
});
