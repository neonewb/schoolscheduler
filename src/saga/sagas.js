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
  setDocToRxStateAC,
  GET_DOC_FROM_DB,
  setIsLoadingTrue,
  setIsLoadingFalse,
  SET_SCHED_TITLE,
  updateFailedAC,
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
      title: 'New schedule',
    })

    yield put(addDocToCollectionSuccessAC(response.id))
  } catch (error) {
    yield put(addDocToCollectionFailedAC(error))
  }
}

function* getDocFromDBSaga(action) {
  try {
    yield put(setIsLoadingTrue())
    const docRef = schedulesColl.doc(action.docID)

    const mySchedule = yield call([docRef, docRef.get])

    if (mySchedule.exists) {
      yield put(setDocToRxStateAC({ id: mySchedule.id, ...mySchedule.data() }))
      yield put(setIsLoadingFalse())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      yield put(setIsLoadingFalse())
    }
  } catch (error) {
    console.error('Error get doc:', error)
    yield put(setIsLoadingFalse())
  }
}

function* getDocsFromDBSaga(action) {
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
      yield put(setDocToRxStateAC(element))
    }
  } catch (error) {
    console.error('Error get docs:', error)
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

function* setSchedTitleSaga(action) {
  const docRef = schedulesColl.doc(action.payload.schedID)

  try {
    yield call([docRef, docRef.update], {title: action.payload.title})
    console.log('Schedule Title successfully updated!');
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

export function* mySaga() {
  yield takeEvery(SIGN_UP_USER, signUpSaga)
  yield takeEvery(LOG_IN_USER, logInSaga)
  yield takeEvery(LOG_OUT_USER, logOutSaga)
  yield takeEvery(LOG_IN_WITH_GOOGLE, logInWithGoogleSaga)
  yield takeEvery(ADD_DOC_TO_COLLECTION, addDocToCollectionSaga)
  yield takeEvery(GET_DOC_FROM_DB, getDocFromDBSaga)
  yield takeEvery(GET_DOCS_FROM_DB, getDocsFromDBSaga)
  yield takeEvery(DEL_DOC_FROM_COLLECTION, deleteDocFromCollectionSaga)
  yield takeEvery(SET_SCHED_TITLE, setSchedTitleSaga)
}
