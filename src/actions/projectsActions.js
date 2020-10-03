import { ADD_PROJECT } from "./../types";

export function addProjectAction(project) {
  return (dispatch) => {
    dispatch(addProject(project));
  };
}
const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project,
});
