import { ADD_PROJECT } from "./../types";

const inisialState = {
  projectsall: [],
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projectsall: [...state.projectsall, action.payload],
      };
    default:
      return state;
  }
};
