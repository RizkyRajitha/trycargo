import {
  SET_CURRENT_USER,
  SET_NEW_ITEM,
  UPDATE_PROFILE,
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {
    items: [{}],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_NEW_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          items: action.payload,
        },
      };
    case UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          buisnessname: action.payload.buisnessname,
          buisnessphone: action.payload.buisnessphone,
          address: action.payload.address,
          aboutus: action.payload.aboutus,
          workinghours: action.payload.workinghours,
          email: action.payload.email,
        },
      };
    }
    default:
      return state;
  }
};
