import { GET_SUPPLIES, NEW_ORDER } from "../actions/types";

const initialState = {
  shops: [{}],
  orders: [{}],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIES:
      return {
        ...state,
        shops: action.payload.shops,
        orders: action.payload.orders,
      };
    case NEW_ORDER:
      state.orders.push(action.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
};
