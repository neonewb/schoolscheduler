import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthAPI } from '../../api/authApi'
import { clearRxStateAC } from '../schedules/sched.actions'
import {
  logOutUserFailedAC,
  signUpUserFailedAC,
  signUpUserSuccessAC,
  logInUserSuccessAC,
  logInUserFailedAC,
  SignUpUserT,
  LogInUserT,
} from './auth.actions'

function* signUp(action: SignUpUserT) {
  try {
    const user: firebase.User = yield call(
      AuthAPI.signUp,
      action.payload.email,
      action.payload.password
    )
    yield put(signUpUserSuccessAC(user))
  } catch (error) {
    yield put(signUpUserFailedAC(error.message))
  }
}

function* logIn(action: LogInUserT) {
  try {
    const user: firebase.User = yield call(
      AuthAPI.signIn,
      action.payload.email,
      action.payload.password
    )
    yield put(logInUserSuccessAC(user))
  } catch (error) {
    yield put(logInUserFailedAC(error.message))
  }
}

function* logOut() {
  try {
    yield call(AuthAPI.signOut)
    yield put(clearRxStateAC())
  } catch (error) {
    yield put(logOutUserFailedAC(error.message))
  }
}

function* logInWithGoogle() {
  try {
    const user: firebase.User = yield call(AuthAPI.googleSignIn)
    yield put(logInUserSuccessAC(user))
  } catch (error) {
    yield put(logInUserFailedAC(error.message))
  }
}

export function* authSaga() {
  yield takeEvery('SIGN_UP_USER', signUp)
  yield takeEvery('LOG_IN_USER', logIn)
  yield takeEvery('LOG_OUT_USER', logOut)
  yield takeEvery('LOG_IN_WITH_GOOGLE', logInWithGoogle)
}