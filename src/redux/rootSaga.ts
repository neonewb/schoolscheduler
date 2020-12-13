import { all } from "redux-saga/effects";
import { mySaga } from "../saga/sagas";
import { authSaga } from "./auth/auth.sagas";

export default function* rootSaga() {
  yield all([authSaga(), mySaga()]);
}
