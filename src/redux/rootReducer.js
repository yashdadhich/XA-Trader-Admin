import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { rolesSlice } from "../app/modules/Roles/_redux/slice";
import { usersSlice } from "../app/modules/Users/_redux/slice";
import { settingsSlice } from "../app/modules/Settings/_redux/slice";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  roles: rolesSlice.reducer,
  users: usersSlice.reducer,
  settings: settingsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}