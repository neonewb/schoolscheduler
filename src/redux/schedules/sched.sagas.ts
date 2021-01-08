import { manuallyCreateScheduleAC, setTimeTableAC } from './../timetable/tt.actions'
import { firestore } from 'firebase'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { dbApi } from '../../api/dbApi'
import {
  addDocToCollectionFailedAC,
  addDocToCollectionSuccessAC,
  delDocFromCollFailedAC,
  delDocsFromRxStateAC,
  setDocToSchedStateAC,
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
  getChoosenScheduleID,
  getChoosenSchedules,
} from './sched.selectors'
import { showSnack } from '../../components/Notifier'

function* addDocToCollection(action: AddDocToCollectionT) {
  const payload = action.payload
  try {
    const response: firestore.DocumentReference<firestore.DocumentData> = yield call(
      dbApi.addDoc,
      {
        email: payload.email,
        userid: payload.userID,
        title: 'New schedule',
        numberOfDays: 5,
        maxLessonsPerDay: 6,
        numberOfColumns: 2,
        isOpenCustomClassNames: false,
        hasTimeTable: false,
        checked: [],
        classes: [],
        subjects: [],
        teachers: [],
        load: [],
      }
    )

    yield put(
      addDocToCollectionSuccessAC(
        response.id,
        payload.email,
        payload.userID,
        'New schedule',
        5,
        6,
        2,
        false,
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
function* getDocFromDB(action: GetDocFromDBT) {
  const payload = action.payload
  try {
    yield put(setIsLoadingTrue())

    const mySchedule: firestore.DocumentSnapshot<firestore.DocumentData> = yield call(
      dbApi.getDoc,
      payload.docID
    )

    if (mySchedule.exists) {
      //@ts-ignore
      const schedule: ScheduleT = mySchedule.data()
      schedule.id = mySchedule.id
      if (schedule.email === payload.email) {
        if (schedule.hasTimeTable) {
          //@ts-ignore
          yield put(setTimeTableAC(schedule.timetable))
        }
        //@ts-ignore
        delete schedule.timetable
        yield put(setDocToSchedStateAC(schedule))
        yield put(chooseSingleAC(mySchedule.id))
        yield put(setIsLoadingFalse())
      }
    } else {
      // doc.data() will be undefined in this case
      console.error('No such document!')
      showSnack('No such document!', 'error')
      yield put(setIsLoadingFalse())
    }
  } catch (error) {
    console.error('Error get doc: ', error)
    showSnack(`Error: ${error.message}`, 'error')
    yield put(setIsLoadingFalse())
  }
}

// Fetch multiple doc
function* getDocsFromDB(action: GetDocsFromDBT) {
  const payload = action.payload
  try {
    const querySnapshot: firestore.QuerySnapshot<firestore.DocumentData> = yield call(
      dbApi.getDocs,
      payload.email,
      payload.userID
    )

    let arrDoc: Array<ScheduleT> = []

    querySnapshot.forEach(function (doc: any) {
      arrDoc.push({
        id: doc.id,
        ...doc.data(),
        timetable: undefined,
      })
    })

    for (const element of arrDoc) {
      yield put(setDocToSchedStateAC(element))
    }
  } catch (error) {
    console.error('Error get docs: ', error)
    showSnack(`Error: ${error.message}`, 'error')
  }
}

function* deleteDocsFromCollection() {
  const choosenSchedules: Array<ScheduleT> = yield select(getChoosenSchedules)
  try {
    yield all(choosenSchedules.map((i) => call(deleteDocFromCollectionS, i.id)))
    yield put(delDocsFromRxStateAC())
    showSnack(`${choosenSchedules.length} schedule(s) removed`, 'default')
  } catch (error) {
    yield put(delDocFromCollFailedAC(error))
  }
}

function* deleteDocFromCollectionS(id: string) {
  yield call(dbApi.delDoc, id)
}

function* updateField(action: UpdateFieldT) {
  const id: string = yield select(getChoosenScheduleID)

  try {
    yield call(dbApi.updateDoc, id, {
      [action.payload.field]: action.payload.content,
    })
    showSnack(`Schedule ${action.payload.field} updated`, 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setCheckedClassesS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  try {
    yield call(dbApi.updateDoc, schedule.id, {
      classes: schedule.classes,
      checked: schedule.checked,
      isOpenCustomClassNames: schedule.isOpenCustomClassNames,
    })
    showSnack('Checked and classes updated', 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setSubjectS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  try {
    yield call(dbApi.updateDoc, schedule.id, {
      subjects: schedule.subjects,
    })
    showSnack('Subjects updated', 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setTeacherS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  try {
    yield call(dbApi.updateDoc, schedule.id, {
      teachers: schedule.teachers,
    })
    showSnack('Teachers updated', 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setLoadS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)

  try {
    yield call(dbApi.updateDoc, schedule.id, {
      load: schedule.load,
    })
    showSnack('Load updated', 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* setSortedS() {
  const schedule: ScheduleT = yield select(getChoosenSchedule)
  yield put(manuallyCreateScheduleAC(schedule))
  try {
    yield call(dbApi.updateDoc, schedule.id, {
      classes: schedule.classes,
      teachers: schedule.teachers,
      subjects: schedule.subjects,
      load: schedule.load,
    })
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

export function* schedulesSaga() {
  yield takeEvery('ADD_DOC_TO_COLLECTION', addDocToCollection)
  yield takeEvery('GET_DOC_FROM_DB', getDocFromDB)
  yield takeEvery('GET_DOCS_FROM_DB', getDocsFromDB)
  yield takeEvery('DEL_DOCS_FROM_COLLECTION', deleteDocsFromCollection)
  yield takeEvery('UPDATE_FIELD', updateField)
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
  yield takeEvery('SORT_SHED_SETTINGS', setSortedS)
}
