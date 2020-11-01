import { call, put, takeEvery } from 'redux-saga/effects'
import { auth, db, googleProvider } from '../configs/firebase.config'
import {
  SIGN_UP_USER,
  signUpUserFailedAC,
  signUpUserSuccessAC,
  logInUserSuccessAC,
  logInUserFailedAC,
  LOG_IN_USER,
  LOG_OUT_USER,
  logOutUserFailedAC,
  LOG_IN_WITH_GOOGLE,
} from '../redux/auth/auth.actions'
import {
  addDocToCollectionFailedAC,
  addDocToCollectionSuccessAC,
  ADD_DOC_TO_COLLECTION,
  DEL_DOC_FROM_COLLECTION,
  delDocFromCollFailedAC,
  delDocFromRxStateAC,
  clearRxStateAC,
  GET_DOCS_FROM_DB,
  setDocsToRxStateAC,
} from '../redux/database/firestore.actions'

function* signUpSaga(action) {
  try {
    const response = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    )
    yield put(signUpUserSuccessAC(response))
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
    yield put(signUpUserFailedAC(error_message))
  }
}

function* logInSaga(action) {
  try {
    const response = yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    )
    yield put(logInUserSuccessAC(response))
  } catch (error) {
    const error_message = { code: error.code, message: error.message }
    yield put(logInUserFailedAC(error_message))
  }
}

function* logOutSaga() {
  try {
    yield call([auth, auth.signOut])
    yield put(clearRxStateAC())
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

const schedulesColl = db.collection('schedules')

function* addDocToCollectionSaga(action) {
  try {
    const response = yield call([schedulesColl, schedulesColl.add], {
      email: action.email,
      userid: action.userID,
    })

    yield put(addDocToCollectionSuccessAC(response.id))
  } catch (error) {
    yield put(addDocToCollectionFailedAC(error))
  }
}

function* getDoscFromDBSaga(action) {
  try {
    const mySchedules = schedulesColl
      .where('email', '==', action.email)
      .where('userid', '==', action.userID)

    const querySnapshot = yield call([mySchedules, mySchedules.get])

    let arrDoc = []

    querySnapshot.forEach(function (doc) {
      arrDoc.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    for (const element of arrDoc) {
      yield put(setDocsToRxStateAC(element))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function* deleteDocFromCollectionSaga(action) {
  const docRef = schedulesColl.doc(action.docID)

  try {
    yield call([docRef, docRef.delete])
    yield put(delDocFromRxStateAC(action.docID))
  } catch (error) {
    yield put(delDocFromCollFailedAC(error))
  }
}

export function* mySaga() {
  yield takeEvery(SIGN_UP_USER, signUpSaga)
  yield takeEvery(LOG_IN_USER, logInSaga)
  yield takeEvery(LOG_OUT_USER, logOutSaga)
  yield takeEvery(LOG_IN_WITH_GOOGLE, logInWithGoogleSaga)
  yield takeEvery(ADD_DOC_TO_COLLECTION, addDocToCollectionSaga)
  yield takeEvery(GET_DOCS_FROM_DB, getDoscFromDBSaga)
  yield takeEvery(DEL_DOC_FROM_COLLECTION, deleteDocFromCollectionSaga)
}
