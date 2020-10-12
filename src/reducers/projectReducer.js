import {
  ADD_PROJECT,
  GET_PROJECTS,
  SET_PROJECT_TASK,
  SET_PROJECT_USER,
  DELETE_PROJECT_USER,
  GET_PROJECT_TASK,
  GET_TASK_TO_EDIT,
  DELETE_TASK_TO_EDIT,
  STATUS_DELETE,
  SET_TASK_TO_EDIT,
  SET_STATUS_TO_EDIT,
  DELETE_PROJECT_FIREBASE,
} from "./../types";

const inisialState = {
  projectsall: [],
  projectTaskAdd: null,
  projectusertask: [],
  listtasks: [],
  tasktoedit: null,
  statusdelete: false,
  statusedit: false,
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projectsall: [...state.projectsall, action.payload],
      };
    case GET_PROJECTS:
      return {
        ...state,
        projectsall: action.payload,
      };
    case SET_PROJECT_TASK:
      return {
        ...state,
        projectTaskAdd: action.payload,
      };
    case SET_PROJECT_USER:
      return {
        ...state,
        projectusertask: action.payload,
      };
    case DELETE_PROJECT_USER:
    case DELETE_PROJECT_FIREBASE:
      return {
        ...state,
        projectusertask: [],
        projectTaskAdd: null,
      };
    case GET_PROJECT_TASK:
      return {
        ...state,
        listtasks: action.payload,
      };
    case GET_TASK_TO_EDIT:
      return {
        ...state,
        tasktoedit: action.payload,
      };
    case DELETE_TASK_TO_EDIT:
      return {
        ...state,
        tasktoedit: null,
      };
    case STATUS_DELETE:
      return {
        ...state,
        statusdelete: action.payload,
      };
    case SET_TASK_TO_EDIT:
      return {
        ...state,
        tasktoedit: null,
      };
    case SET_STATUS_TO_EDIT:
      return {
        ...state,
        statusedit: action.payload,
      };
    default:
      return state;
  }
};
