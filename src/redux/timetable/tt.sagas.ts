import { getConflict, getLesson, getTimetableS } from './tt.selectors'
import { TTInitialStateT } from './tt.reducer'
import {
  getChoosenScheduleID,
  hasTimetableS,
} from '../schedules/sched.selectors'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { setHasTimeTableAC, updateFailedAC } from '../schedules/sched.actions'
import { dbApi } from '../../api/dbApi'
import { TtAcTypes } from './timetable.d'
import {
  dropLesson,
  dropLessonAT,
  getTimeTableACT,
  manCreateSchedT,
  resolveConflictACT,
  setTimeTableAC,
  TtIsLoadingFalse,
  TtIsLoadingTrue,
} from './tt.actions'
import { showSnack } from '../../components/Notifier'
import firebase from 'firebase'

function* manuallyCreateTimeTable({ payload }: manCreateSchedT) {
  const { id, hasTimeTable } = payload.schedule
  const timetable: TTInitialStateT = yield select(getTimetableS)

  try {
    yield call(dbApi.updateDoc, id, {
      timetable: timetable,
      hasTimeTable: true,
    })
    console.log(`Timetable successfully created!`)
    showSnack('Timetable successfully created!', 'success')
    if (!hasTimeTable) {
      yield put(setHasTimeTableAC(id))
    }
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

function* getTimeTable({ payload }: getTimeTableACT) {
  const hasTimetable: boolean = yield select(hasTimetableS, payload.id)
  if (hasTimetable) {
    try {
      yield put(TtIsLoadingTrue())
      const timetable = yield call(dbApi.getTimeTable, payload.id)
      console.log(`Schedule timetable successfully received!`)
      yield put(setTimeTableAC(timetable))
      yield put(TtIsLoadingFalse())
    } catch (error) {
      yield put(updateFailedAC(error))
    }
  }
}

function* dropLessonAfterResolved({ payload }: resolveConflictACT) {
  if (payload.answer) {
    const { lesson, dropResult, source } = yield select(getConflict)
    yield put(dropLesson(lesson, dropResult, source))
  }
}

function* updateTimetable({ payload }: dropLessonAT) {
  const shedId = getChoosenScheduleID(yield select())  
  // const { lesson, dropResult: {target}, source } = payload
  const timetable: TTInitialStateT = yield select(getTimetableS)

  try {
    yield call(dbApi.updateDoc, shedId, {
      timetable: timetable,
    })
    // if (target === 'footer' || source === 'footer') {
    //   const mylesson = yield select(getLesson, lesson)
    //   yield call(dbApi.updateDoc, shedId, {
    //     'timetable.lessonsTT': firebase.firestore.FieldValue.arrayUnion(mylesson),
    //   })
    // }
    showSnack('Timetable successfully updated!', 'success')
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

export function* ttSaga() {
  yield takeEvery(TtAcTypes.MANUALLY_CREATE_SCHEDULE, manuallyCreateTimeTable)
  yield takeEvery(TtAcTypes.GET_TIMETABLE, getTimeTable)
  yield takeEvery(TtAcTypes.RESOLVE_CONFLICT, dropLessonAfterResolved)
  yield takeEvery(TtAcTypes.DROP_LESSON, updateTimetable)
}
