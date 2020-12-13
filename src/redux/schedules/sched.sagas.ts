import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { schedulesColl } from '../../configs/firebase.config'
import {
  addDocToCollectionFailedAC,
  addDocToCollectionSuccessAC,
  delDocFromCollFailedAC,
  delDocsFromRxStateAC,
  setDocToRxStateAC,
  setIsLoadingTrue,
  setIsLoadingFalse,
  updateFailedAC,
  chooseSingleAC,
  AddDocToCollectionT,
  GetDocFromDBT,
  GetDocsFromDBT,
  UpdateFieldT,
  ScheduleT,
} from './sched.actions'
import {
  getChoosenSchedule,
  getChoosenSchedules,
} from './sched.selectors'

function* addDocToCollectionS(action: AddDocToCollectionT) {
  const payload = action.payload
  try {
    const response = yield call([schedulesColl, schedulesColl.add], {
      email: payload.email,
      userid: payload.userID,
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
    })

    yield put(
      addDocToCollectionSuccessAC(
        response.id,
        payload.email,
        payload.userID,
        'New schedule',
        6,
        10,
        2,
        false,
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
function* getDocFromDBS(action: GetDocFromDBT) {
  const payload = action.payload
  try {
    yield put(setIsLoadingTrue())
    const docRef = schedulesColl.doc(payload.docID)

    const mySchedule = yield call([docRef, docRef.get])

    if (mySchedule.exists) {
      const schedule: ScheduleT = mySchedule.data()
      schedule.id = mySchedule.id
      if (schedule.email === payload.email) {
        yield put(setDocToRxStateAC(schedule))
        yield put(chooseSingleAC(mySchedule.id))
        yield put(setIsLoadingFalse())
      }
    } else {
      // doc.data() will be undefined in this case
      console.error('No such document!')
      yield put(setIsLoadingFalse())
    }
  } catch (error) {
    console.error('Error get doc:', error)
    yield put(setIsLoadingFalse())
  }
}

// Fetch multiple doc
function* getDocsFromDBS(action: GetDocsFromDBT) {
  const payload = action.payload
  try {
    const mySchedules = schedulesColl
      .where('email', '==', payload.email)
      .where('userid', '==', payload.userID)

    const querySnapshot = yield call([mySchedules, mySchedules.get])

    let arrDoc: Array<ScheduleT> = []

    querySnapshot.forEach(function (doc: any) {
      arrDoc.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    for (const element of arrDoc) {
      yield put(setDocToRxStateAC(element))
    }
  } catch (error) {
    console.error('Error get docs: ', error)
  }
}

function* deleteDocsFromCollectionS() {
  const choosenSchedules: Array<ScheduleT> = yield select(getChoosenSchedules)

  yield all(choosenSchedules.map((i) => call(deleteDocFromCollectionS, i.id)))
  yield put(delDocsFromRxStateAC())
}

function* deleteDocFromCollectionS(id: string) {
  console.log(id)
  const docRef = schedulesColl.doc(id)

  try {
    yield call([docRef, docRef.delete])
  } catch (error) {
    yield put(delDocFromCollFailedAC(error))
  }
}
function* updateFieldS(action: UpdateFieldT) {
  const docRef = schedulesColl.doc(action.payload.schedID)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
      [action.payload.field]: action.payload.content,
    })
    console.log(`Schedule ${action.payload.field} successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setCheckedClassesS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  const docRef = schedulesColl.doc(schedule.id)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
      classes: schedule.classes,
      checked: schedule.checked,
      isOpenCustomClassNames: schedule.isOpenCustomClassNames,
    })
    console.log(`Schedule checked and classes successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setSubjectS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  const docRef = schedulesColl.doc(schedule.id)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
      subjects: schedule.subjects,
    })
    console.log(`Schedule subjects successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setTeacherS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  const docRef = schedulesColl.doc(schedule.id)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
      teachers: schedule.teachers,
    })
    console.log(`Schedule teachers successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setLoadS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  const docRef = schedulesColl.doc(schedule.id)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
      load: schedule.load,
    })
    console.log(`Schedule load successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

export function* schedulesSaga() {
  yield takeEvery('ADD_DOC_TO_COLLECTION', addDocToCollectionS)
  yield takeEvery('GET_DOC_FROM_DB', getDocFromDBS)
  yield takeEvery('GET_DOCS_FROM_DB', getDocsFromDBS)
  yield takeEvery('DEL_DOCS_FROM_COLLECTION', deleteDocsFromCollectionS)
  yield takeEvery('UPDATE_FIELD', updateFieldS)
  yield takeEvery('ALL_CHECK', setCheckedClassesS)
  yield takeEvery('CLEAR_CHECKED_AND_CLASSES', setCheckedClassesS)
  yield takeEvery('OPEN_CUSTOM_CLASS_NAMES', setCheckedClassesS)
  yield takeEvery('SET_CHECK', setCheckedClassesS)
  yield takeEvery('SET_CLASS', setCheckedClassesS)
  yield takeEvery('SET_CUSTOM_CLASS', setCheckedClassesS)
  yield takeEvery('DELETE_CUSTOM_CLASS', setCheckedClassesS)
  yield takeEvery('ADD_COLUMN', setCheckedClassesS)
  yield takeEvery('SUBTRACT_COLUMN', setCheckedClassesS)
  yield takeEvery('SET_SUBJECT', setSubjectS)
  yield takeEvery('DELETE_SUBJECT', setSubjectS)
  yield takeEvery('SET_TEACHER', setTeacherS)
  yield takeEvery('DELETE_TEACHER', setTeacherS)
  yield takeEvery('SET_LOAD', setLoadS)
  yield takeEvery('DELETE_LOAD', setLoadS)
}
