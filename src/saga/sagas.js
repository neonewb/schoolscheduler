import { call, put, select, takeEvery } from 'redux-saga/effects'
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
  updateFailedAC,
  UPDATE_FIELD,
  CLEAR_CHECKED_AND_CLASSES,
  ALL_CHECK,
  SET_CHECK,
  SET_CLASS,
  ADD_COLUMN,
  SUBTRACT_COLUMN,
  OPEN_CUSTOM_CLASS_NAMES,
  SET_CUSTOM_CLASS,
  DELETE_CUSTOM_CLASS,
  SET_SUBJECT,
  DELETE_SUBJECT,
  SET_TEACHER,
  DELETE_TEACHER,
  chooseSingleAC,
  SET_LOAD,
  DELETE_LOAD,
  MANUALLY_CREATE_SCHEDULE,
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
      numberOfDays: 6,
      maxLessonsPerDay: 10,
      numberOfColumns: 2,
      isOpenCustomClassNames: false,
      checked: [],
      classes: [],
      subjects: [],
      teachers: [],
      load: [],
      timeTable: [],
    })

    yield put(
      addDocToCollectionSuccessAC(
        response.id,
        action.email,
        action.userID,
        'New schedule',
        6,
        10,
        2,
        false,
        [],
        [],
        [],
        [],
        [],
        []
      )
    )
  } catch (error) {
    yield put(addDocToCollectionFailedAC(error))
  }
}

// Fetch single doc
function* getDocFromDBSaga(action) {
  try {
    yield put(setIsLoadingTrue())
    const docRef = schedulesColl.doc(action.docID)

    const mySchedule = yield call([docRef, docRef.get])

    if (mySchedule.exists) {
      yield put(setDocToRxStateAC({ id: mySchedule.id, ...mySchedule.data() }))
      yield put(chooseSingleAC(mySchedule.id))
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

// Fetch multiple doc
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

function* updateFieldSaga(action) {
  const docRef = schedulesColl.doc(action.payload.schedID)

  try {
    yield call([docRef, docRef.update], {
      [action.payload.field]: action.payload.content,
    })
    console.log(`Schedule ${action.payload.field} successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setCheckedClassesSaga() {
  const schedule = yield select(state => state.fsdb.schedules.find((e) => e.isChoosen))

  const docRef = schedulesColl.doc(schedule.id)

  try {    
    yield call([docRef, docRef.update], {
      classes: schedule.classes,
      checked: schedule.checked,
      isOpenCustomClassNames: schedule.isOpenCustomClassNames
    })
    console.log(`Schedule checked and classes successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setSubjectSaga() {
  const schedule = yield select(state => state.fsdb.schedules.find((e) => e.isChoosen))

  const docRef = schedulesColl.doc(schedule.id)

  try {    
    yield call([docRef, docRef.update], {
      subjects: schedule.subjects,
    })
    console.log(`Schedule subjects successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setTeacherSaga() {
  const schedule = yield select(state => state.fsdb.schedules.find((e) => e.isChoosen))

  const docRef = schedulesColl.doc(schedule.id)

  try {    
    yield call([docRef, docRef.update], {
      teachers: schedule.teachers,
    })
    console.log(`Schedule teachers successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setLoadSaga() {
  const schedule = yield select(state => state.fsdb.schedules.find((e) => e.isChoosen))

  const docRef = schedulesColl.doc(schedule.id)

  try {    
    yield call([docRef, docRef.update], {
      load: schedule.load,
    })
    console.log(`Schedule load successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setTimeTableSaga() {
  const schedule = yield select(state => state.fsdb.schedules.find((e) => e.isChoosen))

  const docRef = schedulesColl.doc(schedule.id)

  try {    
    yield call([docRef, docRef.update], {
      timeTable: schedule.timeTable,
    })
    console.log(`Schedule timeTable successfully updated!`)
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
  yield takeEvery(UPDATE_FIELD, updateFieldSaga)
  yield takeEvery(ALL_CHECK, setCheckedClassesSaga)
  yield takeEvery(CLEAR_CHECKED_AND_CLASSES, setCheckedClassesSaga)
  yield takeEvery(OPEN_CUSTOM_CLASS_NAMES, setCheckedClassesSaga)
  yield takeEvery(SET_CHECK, setCheckedClassesSaga)
  yield takeEvery(SET_CLASS, setCheckedClassesSaga)
  yield takeEvery(SET_CUSTOM_CLASS, setCheckedClassesSaga)
  yield takeEvery(DELETE_CUSTOM_CLASS, setCheckedClassesSaga)
  yield takeEvery(ADD_COLUMN, setCheckedClassesSaga)
  yield takeEvery(SUBTRACT_COLUMN, setCheckedClassesSaga)
  yield takeEvery(SET_SUBJECT, setSubjectSaga)
  yield takeEvery(DELETE_SUBJECT, setSubjectSaga)
  yield takeEvery(SET_TEACHER, setTeacherSaga)
  yield takeEvery(DELETE_TEACHER, setTeacherSaga)
  yield takeEvery(SET_LOAD, setLoadSaga)
  yield takeEvery(DELETE_LOAD, setLoadSaga)
  yield takeEvery(MANUALLY_CREATE_SCHEDULE, setTimeTableSaga)
}
