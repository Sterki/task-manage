import { ADD_PROJECT, GET_PROJECTS, SET_PROJECT_TASK } from "./../types";

export function addProjectAction(project) {
  return (dispatch) => {
    dispatch(addProject(project));
  };
}
const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project,
});

export function getProjectsAction(projects) {
  return (dispatch) => {
    dispatch(getProjects(projects));
  };
}

const getProjects = (projects) => ({
  type: GET_PROJECTS,
  payload: projects,
});

export function setProjectTaskAction(id, project) {
  return (dispatch) => {
    dispatch(setProjectTask(id, project));
  };
}
const setProjectTask = (id, project) => ({
  type: SET_PROJECT_TASK,
  payload: {
    id,
    project,
  },
});
