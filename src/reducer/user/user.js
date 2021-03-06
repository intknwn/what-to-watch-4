import {AuthorizationStatus} from "../../const.js";
import {parseFilmCards} from "../../adapters/filmCards.js";
import {extend} from "../../utils.js";
import {URL, AppRout} from "../../const.js";
import history from "../../history.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  favorites: [],
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      authorizationStatus: status,
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      favorites,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.authorizationStatus
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.favorites
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(URL.LOGIN)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch(() => {});
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(URL.LOGIN, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        history.push(AppRout.MAIN_PAGE);
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(URL.FAVORITE)
    .then((response) => {
      return parseFilmCards(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadFavorites(response));
      return response;
    });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
