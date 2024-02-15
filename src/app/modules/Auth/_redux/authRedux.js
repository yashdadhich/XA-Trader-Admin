import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: null,
  role: null,
};

export const reducer = persistReducer(
  {
    storage,
    key: "v726-demo1-auth",
    whitelist: [],
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { accessToken, refreshToken, referralToken } = action.payload;

        localStorage.setItem(
          "authToken",
          JSON.stringify({ accessToken, refreshToken, referralToken })
        );

        return state;
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        localStorage.removeItem("authToken");
        return { ...state, ...initialAuthState };
      }

      case actionTypes.UserLoaded: {
        if (!action.payload) {
          return state;
        }

        const { role, ...user } = action.payload;

        return { ...state, role, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (accessToken, refreshToken, referralToken) => ({
    type: actionTypes.Login,
    payload: { accessToken, refreshToken, referralToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({
    type: actionTypes.UserLoaded,
    payload: user,
  }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
