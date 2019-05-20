import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { compose } from "redux";

import {
  Button,
  IconButton,
  withStyles,
  Typography,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  makeSelectGame,
  makeSelectIsLoading,
  makeSelectGenres
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import globalMessages from "../../globalMessages";
import styles from "./styles";
import { IMAGE_URL } from "../../constants";
import AppLoader from "../../containers/AppLayout/AppLoader";
import { GAME_LIST_PAGE_PATH } from "../../pagePaths";
import { createGame, loadGame, initGame, loadGenres } from "./actions";
import ErrorMessage from "../../components/ErrorMsg";

export class GamePage extends React.PureComponent {
  state = {
    title: "",
    image: null,
    imageUrl: "",
    uploadError: false,
    selectError: false,
    gameId: null,
    selectedGenres: []
  };

  componentDidMount() {
    const { match } = this.props;
    const gameId = match.params.id;
    this.props.loadGenres();
    if (gameId) {
      this.props.loadGame(gameId);
      this.setState({ gameId });
      return;
    }
    this.props.initGame();
  }

  componentDidUpdate(oldProps) {
    const { game } = this.props;
    if (oldProps.game !== game && game) {
      this.setState({
        title: game.title,
        imageUrl: game.image_url,
        selectedGenres: this.getGameTitleList()
      });
    }
  }

  getGameTitleList() {
    const { game } = this.props;
    return game.genres.map(genre => genre.title);
  }

  handleChangeGame = event => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleSubmit() {
    const { title, image, imageUrl, gameId, selectedGenres } = this.state;
    const { genres } = this.props;
    if (!selectedGenres.length) {
      this.setState({ selectError: true });
      return;
    }
    if (!image && !imageUrl.length) {
      this.setState({ uploadError: true });
      return;
    }
    const selectedGenresIds = genres
      .filter(gen => selectedGenres.includes(gen.title))
      .map(gen => gen.id);

    this.props.createGame({
      gameId,
      title,
      image,
      selectedGenresIds
    });
  }

  handleChangeImage = image => {
    this.setState({ image, uploadError: false });
  };

  handleCancel = () => {
    this.props.history.push(GAME_LIST_PAGE_PATH);
  };

  handleChangeGenres = event => {
    this.setState({ selectedGenres: event.target.value, selectError: false });
  };

  isGenreSelected(title) {
    const { selectedGenres } = this.state;
    return selectedGenres.includes(title);
  }

  render() {
    const {
      title,
      image,
      uploadError,
      imageUrl,
      selectedGenres,
      selectError,
      gameId
    } = this.state;
    const { classes, isLoading, genres } = this.props;
    if (isLoading) {
      return <AppLoader />;
    }
    return (
      <div>
        <div className="display-flex align-center mb2">
          <IconButton
            onClick={() => {
              this.props.history.goBack();
            }}
            className="mr1"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className="text-uppercase">
            {gameId ? (
              <FormattedMessage {...messages.editGame} />
            ) : (
              <FormattedMessage {...messages.newGame} />
            )}
          </Typography>
        </div>

        <ValidatorForm onSubmit={() => this.handleSubmit()}>
          <div className={classes.form}>
            <div className="mb2 full-width">
              <TextValidator
                label={<FormattedMessage {...messages.gameName} />}
                onChange={this.handleChangeGame}
                name="name"
                value={title}
                className="full-width"
                validators={["required"]}
                errorMessages={[
                  <ErrorMessage>
                    <FormattedMessage {...globalMessages.requiredField} />
                  </ErrorMessage>
                ]}
              />
            </div>
            <InputLabel htmlFor="select-multiple-checkbox">
              <FormattedMessage {...messages.gameGenre} />
            </InputLabel>
            <div className="mb2">
              <Select
                multiple
                value={selectedGenres}
                onChange={this.handleChangeGenres}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                className="full-width"
              >
                {genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.title}>
                    <Checkbox checked={this.isGenreSelected(genre.title)} />
                    <ListItemText primary={genre.title} />
                  </MenuItem>
                ))}
              </Select>
              {selectError && (
                <ErrorMessage varinat="caption" className={classes.error}>
                  <FormattedMessage {...messages.selectError} />
                </ErrorMessage>
              )}
            </div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={e => this.handleChangeImage(e.target.files[0])}
            />
            <div className="mb2 text-center">
              <Typography variant="caption" className="mb2" color="primary">
                <FormattedMessage {...messages.multipleGenres} />
              </Typography>
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className="mb1">
                  <FormattedMessage {...messages.selectImage} />
                </Button>
              </label>
              <Typography className="word-break mt1" variant="body1">
                {image && image.name ? image.name : ""}
              </Typography>
              {imageUrl && !image ? (
                <img
                  src={`${IMAGE_URL}${imageUrl}`}
                  className={classes.gameImage}
                  alt=""
                />
              ) : null}
              {uploadError && (
                <ErrorMessage varinat="caption" className={classes.error}>
                  <FormattedMessage {...globalMessages.uploadError} />
                </ErrorMessage>
              )}
              <Typography variant="caption" className="mt1" color="primary">
                <FormattedMessage {...messages.recommandedDimensions} />
              </Typography>
            </div>
            <div className="display-flex justify-between">
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleCancel}
              >
                <FormattedMessage {...globalMessages.cancel} />
              </Button>
              <Button variant="contained" color="primary" type="submit">
                <FormattedMessage {...globalMessages.save} />
              </Button>
            </div>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

GamePage.propTypes = {
  game: PropTypes.object,
  createGame: PropTypes.func,
  match: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  loadGame: PropTypes.func,
  isLoading: PropTypes.bool,
  initGame: PropTypes.func,
  loadGenres: PropTypes.func,
  genres: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = createStructuredSelector({
  game: makeSelectGame(),
  isLoading: makeSelectIsLoading(),
  genres: makeSelectGenres()
});

const mapDispatchToProps = {
  createGame,
  loadGame,
  initGame,
  loadGenres
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "gamePage", reducer });
const withSaga = injectSaga({ key: "gamePage", saga });

export default withStyles(styles)(
  compose(
    withReducer,
    withSaga,
    withConnect
  )(GamePage)
);
