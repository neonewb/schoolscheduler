import { call, put, takeEvery } from 'redux-saga/effects'
import { auth, googleProvider } from '../configs/firebase.config'
import { SIGN_UP_USER, signUpUserFailedAC, signUpUserSuccessAC, logInUserSuccessAC, logInUserFailedAC, LOG_IN_USER, LOG_OUT_USER, logOutUserFailedAC, LOG_IN_WITH_GOOGLE } from '../redux/auth/auth.actions';

function* signUpSaga(action) {
  try {
     const response = yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password)
     yield put(signUpUserSuccessAC(response))
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
     yield put(signUpUserFailedAC(error_message))
  }
}

function* logInSaga(action) {
  try {
     const response = yield call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password)
     yield put(logInUserSuccessAC(response))
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
     yield put(logInUserFailedAC(error_message))
  }
}

function* logOutSaga() {
  try {
     yield call([auth, auth.signOut])
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
     yield put(logOutUserFailedAC(error_message))
  }
}

function* logInWithGoogleSaga() {
  try {
    const response = yield call([auth, auth.signInWithPopup], googleProvider)
    yield put(logInUserSuccessAC(response))
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
     yield put(logInUserFailedAC(error_message))
  }
}

export function* mySaga() {
  yield takeEvery(SIGN_UP_USER, signUpSaga)
  yield takeEvery(LOG_IN_USER, logInSaga)
  yield takeEvery(LOG_OUT_USER, logOutSaga)
  yield takeEvery(LOG_IN_WITH_GOOGLE, logInWithGoogleSaga)
}