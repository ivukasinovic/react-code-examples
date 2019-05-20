import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_GAME, LOAD_GAME, LOAD_GENRES } from './constants';
import gameService from '../../services/api-services/GameService';
import genreService from '../../services/api-services/GenreService';
import {
  createGameSuccess,
  gameFailure,
  loadGameSuccess,
  loadGenresSuccess,
} from './actions';
import { GAME_LIST_PAGE_PATH } from '../../pagePaths';

export function* handleCreateGame(action) {
  try {
    const game = yield call(gameService.create, action.payload);
    yield put(createGameSuccess(game));
    yield put(push(GAME_LIST_PAGE_PATH));
  } catch (error) {
    yield put(gameFailure(error));
  }
}

export function* handleLoadGame(action) {
  try {
    const game = yield call(gameService.loadGame, action.payload.id);
    yield put(loadGameSuccess(game));
  } catch (error) {
    yield put(gameFailure(error));
  }
}

export function* handleLoadGenres() {
  try {
    const genres = yield call(genreService.loadGenres);
    yield put(loadGenresSuccess(genres.data));
  } catch (error) {
    yield put(gameFailure(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CREATE_GAME, handleCreateGame);
  yield takeLatest(LOAD_GAME, handleLoadGame);
  yield takeLatest(LOAD_GENRES, handleLoadGenres);
}
