import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGamePageDomain = state => state.get('gamePage', initialState);

const makeSelectGamePage = () =>
  createSelector(selectGamePageDomain, substate => substate.toJS());

const makeSelectGame = () =>
  createSelector(selectGamePageDomain, substate => substate.get('game'));

const makeSelectIsLoading = () =>
  createSelector(selectGamePageDomain, substate => substate.get('isLoading'));

const makeSelectGenres = () =>
  createSelector(selectGamePageDomain, substate => substate.get('genres'));

export default makeSelectGamePage;
export {
  selectGamePageDomain,
  makeSelectGame,
  makeSelectIsLoading,
  makeSelectGenres,
};
