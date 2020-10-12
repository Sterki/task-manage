import { GET_USER_LOGED, DELETE_USER_AUTH, SET_IMAGE_URL } from "./../types";

export function getUserAuthAction(user) {
  return (dispatch) => {
    dispatch(getUserAuth(user));
  };
}
const getUserAuth = (user) => ({
  type: GET_USER_LOGED,
  payload: user,
});

export function deleteUserAuthAction() {
  return (dispatch) => {
    dispatch(deleteUserAuth());
  };
}
const deleteUserAuth = () => ({
  type: DELETE_USER_AUTH,
});

export function setImageUrlAction(imagenUrl) {
  return (dispatch) => {
    dispatch(setImageUrl(imagenUrl));
  };
}

const setImageUrl = (imagenUrl) => ({
  type: SET_IMAGE_URL,
  payload: imagenUrl,
});
