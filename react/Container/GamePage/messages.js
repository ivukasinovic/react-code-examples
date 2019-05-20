import { defineMessages } from 'react-intl';

export default defineMessages({
  newGame: {
    id: 'app.containers.GamePage.newGame',
    defaultMessage: 'New Game',
  },
  editGame: {
    id: 'app.containers.GamePage.editGame',
    defaultMessage: 'Edit Game',
  },
  gameName: {
    id: 'app.containers.GamePage.gameName',
    defaultMessage: 'Game Name',
  },
  gameGenre: {
    id: 'app.containers.GamePage.gameGenre',
    defaultMessage: 'Game Genre',
  },
  selectImage: {
    id: 'app.containers.GamePage.selectImage',
    defaultMessage: 'Select Image',
  },
  recommandedDimensions: {
    id: 'app.containers.GamePage.selectLogo',
    defaultMessage: 'Recommanded dimensions for image are 285 x 380.',
  },
  uploadError: {
    id: 'app.containers.GamePage.uploadError',
    defaultMessage: 'You should select image.',
  },
  selectError: {
    id: 'app.containers.GenrePage.selectError',
    defaultMessage: 'You should select at least one genre.',
  },
  multipleGenres: {
    id: 'app.containers.GamePage.multipleGenres',
    defaultMessage: 'You can select multiple genres for one game.',
  },
});
