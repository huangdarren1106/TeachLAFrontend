import {
  SET_PROGRAM_CODE,
  SET_PROGRAM_LANGUAGE,
  DELETE_PROGRAM,
  LOAD_PROGRAMS,
} from "../actions/programsActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function programsReducers(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROGRAMS:
      return Immutable.fromJS(action.programs);
    case SET_PROGRAM_CODE:
      return state.setIn([action.program, "code"], action.value);
    case SET_PROGRAM_LANGUAGE:
      return state.setIn([action.program, "language"], action.value);
    case DELETE_PROGRAM:
      //TODO: look up Immutable API on how to remove a nested key
      return state;
    default:
      return state;
  }
}

export default programsReducers;
