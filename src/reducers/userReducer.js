import { GET_USER_LOGED, DELETE_USER_AUTH } from "./../types";

const inisialState = {
  userAuth: null,
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case GET_USER_LOGED:
      return {
        ...state,
        userAuth: action.payload,
      };
    case DELETE_USER_AUTH:
      return {
        ...state,
        userAuth: null,
      };
    default:
      return state;
  }
};
