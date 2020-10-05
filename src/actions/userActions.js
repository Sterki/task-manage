import { GET_USER_LOGED, DELETE_USER_AUTH } from "./../types";

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
