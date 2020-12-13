import { firestore } from 'firebase'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { dbApi } from '../../api/dbApi'
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
  getChoosenScheduleID,
  getChoosenSchedules,
} from './sched.selectors'

function* addDocToCollection(action: AddDocToCollectionT) {
  const payload = action.payload
  try {
    const response: firestore.DocumentReference<firestore.DocumentData> = yield call(
      dbApi.addDoc,
      {
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
      }
    )

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
    console.error('Error get doc: ', error)
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
      })
    })

    for (const element of arrDoc) {
      yield put(setDocToRxStateAC(element))
    }
  } catch (error) {
    console.error('Error get docs: ', error)
  }
}

function* deleteDocsFromCollection() {
  const choosenSchedules: Array<ScheduleT> = yield select(getChoosenSchedules)

  yield all(choosenSchedules.map((i) => call(deleteDocFromCollectionS, i.id)))
  yield put(delDocsFromRxStateAC())
}

function* deleteDocFromCollectionS(id: string) {
  try {
    yield call(dbApi.delDoc, id)
  } catch (error) {
    yield put(delDocFromCollFailedAC(error))
  }
}

function* updateField(action: UpdateFieldT) {
  const id: string = yield select(getChoosenScheduleID)

  try {
    yield call(dbApi.updateDoc, id, {
      [action.payload.field]: action.payload.content,
    })
    console.log(`Schedule ${action.payload.field} successfully updated!`)
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
    console.log(`Schedule checked and classes successfully updated!`)
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
    console.log(`Schedule subjects successfully updated!`)
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
    console.log(`Schedule teachers successfully updated!`)
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
    console.log(`Schedule load successfully updated!`)
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
}
