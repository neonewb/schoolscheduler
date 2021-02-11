import { getConflict, getTimetableS } from './tt.selectors'
import { TTInitialStateT } from './tt.reducer'
import { getChoosenScheduleID, hasTimetableS } from '../schedules/sched.selectors'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { setHasTimeTableAC, updateFailedAC } from '../schedules/sched.actions'
import { dbApi } from '../../api/dbApi'
import { TtAcTypes } from './timetable.d'
import {
  dropLesson,
  getTimeTableACT,
  manCreateSchedT,
  resolveConflictACT,
  setTimeTableAC,
  TtIsLoadingFalse,
  TtIsLoadingTrue,
} from './tt.actions'
import { showSnack } from '../../components/Notifier'

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

function* updateTimetable() {
  const id: string = yield select(getChoosenScheduleID)
  const timetable: TTInitialStateT = yield select(getTimetableS)

  try {
    yield call(dbApi.updateDoc, id, {
      timetable: timetable,
    })
    console.log(`Timetable successfully updated!`)
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
