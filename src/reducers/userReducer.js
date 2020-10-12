import { GET_USER_LOGED, DELETE_USER_AUTH, SET_IMAGE_URL } from "./../types";

const inisialState = {
  userAuth: null,
  imageProfile: null,
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
        imageProfile: null,
      };
    case SET_IMAGE_URL:
      return {
        ...state,
        imageProfile: action.payload,
      };
    default:
      return state;
  }
};
