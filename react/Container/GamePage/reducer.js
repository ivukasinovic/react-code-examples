import { fromJS } from "immutable";
import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  GAME_FAILURE,
  LOAD_GAME,
  LOAD_GAME_SUCCESS,
  INIT_GAME,
  LOAD_GENRES_SUCCESS
} from "./constants";
import { LOAD_GENRES } from "../GenreListPage/constants";

export const initialState = fromJS({
  isLoading: false,
  genres: [],
  game: {},
  errors: {}
});

function gamePageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME:
    case LOAD_GAME:
    case LOAD_GENRES:
      return state.set("isLoading", true);
    case CREATE_GAME_SUCCESS:
      return state.set("isLoading", false);
    case GAME_FAILURE:
      return state.set("isLoading", false).set("errors", action.payload);

    case LOAD_GAME_SUCCESS:
      return state.set("isLoading", false).set("game", action.payload);
    case INIT_GAME:
      return state.set("isLoading", false).set("game", {});

    case LOAD_GENRES_SUCCESS:
      return state.set("isLoading", false).set("genres", action.payload);
    default:
      return state;
  }
}

export default gamePageReducer;
