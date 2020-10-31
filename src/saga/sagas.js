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

function* addDocToCollectionSaga(action) {
  let addDoc = yield db.collection(action.email)

  try {
    const response = yield call([addDoc, addDoc.add], {
      first: 'doc',
      created: 'action.date',
    })
    // let updateTimestamp = yield docRef.update({
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // })
    yield put(addDocToCollectionSuccessAC(response.id))
  } catch (error) {
    yield put(addDocToCollectionFailedAC(error))
  }
}

function* deleteDocFromCollectionSaga(action) {
  let docRef = yield db.collection(action.email).doc(action.docId)

  try {
    yield call([docRef, docRef.delete])
    yield put(delDocFromRxStateAC(action.docId))
  } catch (error) {
    yield put(delDocFromCollFailedAC(error))
  }
}

function* getDoscFromDBSaga(action) {
  try {
    const docRef = yield db.collection(action.email)
    const querySnapshot = yield call([docRef, docRef.get])

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

export function* mySaga() {
  yield takeEvery(SIGN_UP_USER, signUpSaga)
  yield takeEvery(LOG_IN_USER, logInSaga)
  yield takeEvery(LOG_OUT_USER, logOutSaga)
  yield takeEvery(LOG_IN_WITH_GOOGLE, logInWithGoogleSaga)
  yield takeEvery(ADD_DOC_TO_COLLECTION, addDocToCollectionSaga)
  yield takeEvery(DEL_DOC_FROM_COLLECTION, deleteDocFromCollectionSaga)
  yield takeEvery(GET_DOCS_FROM_DB, getDoscFromDBSaga)
}
