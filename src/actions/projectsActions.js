import {
  ADD_PROJECT,
  GET_PROJECTS,
  SET_PROJECT_TASK,
  GET_USER_PROJECT,
  SET_PROJECT_USER,
  DELETE_PROJECT_USER,
  GET_PROJECT_TASK,
  GET_TASK_TO_EDIT,
} from "./../types";

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

export function getUserTotheProject(user) {
  return (dispatch) => {
    dispatch(getUserProject(user));
  };
}
const getUserProject = (user) => ({
  type: GET_USER_PROJECT,
  payload: user,
});

export function setProjectUserAction(projectos) {
  return (dispatch) => {
    dispatch(setProjectUser(projectos));
  };
}
const setProjectUser = (projectos) => ({
  type: SET_PROJECT_USER,
  payload: projectos,
});

export function deleteProjectAction() {
  return (dispatch) => {
    dispatch(deleteProjectUser());
  };
}

const deleteProjectUser = () => ({
  type: DELETE_PROJECT_USER,
});

export function getProjectTaskAction(project) {
  return (dispatch) => {
    dispatch(getProjectTask(project));
  };
}
const getProjectTask = (project) => ({
  type: GET_PROJECT_TASK,
  payload: project,
});

export function getTaskProjectAction(tasks) {
  return (dispatch) => {
    dispatch(getTaskProject(tasks));
  };
}
const getTaskProject = (tasks) => ({
  type: GET_PROJECT_TASK,
  payload: tasks,
});

export function getTaskToEditAction(taskid, task) {
  return (dispatch) => {
    dispatch(getTaskToEdit(taskid, task));
  };
}
const getTaskToEdit = (taskid, task) => ({
  type: GET_TASK_TO_EDIT,
  payload: {
    id: taskid,
    task: task,
  },
});
