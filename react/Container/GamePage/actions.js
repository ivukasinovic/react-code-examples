import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  GAME_FAILURE,
  LOAD_GAME,
  LOAD_GAME_SUCCESS,
  INIT_GAME,
  LOAD_GENRES_SUCCESS,
  LOAD_GENRES,
} from './constants';

export function createGame(payload) {
  return {
    type: CREATE_GAME,
    payload,
  };
}

export function createGameSuccess() {
  return {
    type: CREATE_GAME_SUCCESS,
  };
}

export function gameFailure(payload) {
  return {
    type: GAME_FAILURE,
    payload,
  };
}

export function loadGame(payload) {
  return {
    type: LOAD_GAME,
    payload,
  };
}

export function loadGameSuccess(payload) {
  return {
    type: LOAD_GAME_SUCCESS,
    payload,
  };
}

export function initGame() {
  return {
    type: INIT_GAME,
  };
}

export function loadGenres() {
  return {
    type: LOAD_GENRES,
  };
}

export function loadGenresSuccess(payload) {
  return {
    type: LOAD_GENRES_SUCCESS,
    payload,
  };
}
