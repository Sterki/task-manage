import { ADD_PROJECT, GET_PROJECTS, SET_PROJECT_TASK } from "./../types";

const inisialState = {
  projectsall: null,
  projectTaskAdd: null,
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
    default:
      return state;
  }
};
