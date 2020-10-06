import {
  ADD_PROJECT,
  GET_PROJECTS,
  SET_PROJECT_TASK,
  SET_PROJECT_USER,
  DELETE_PROJECT_USER,
} from "./../types";

const inisialState = {
  projectsall: [],
  projectTaskAdd: null,
  projectusertask: [],
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
      return {
        ...state,
        projectusertask: [],
        projectTaskAdd: null,
      };
    default:
      return state;
  }
};
