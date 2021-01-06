import { getConflict, getTimetableS } from './tt.selectors'
import { TTInitialStateT } from './tt.reducer'
import {
  getChoosenScheduleID,
  hasTimetableS,
  hasTimetableSel,
} from '../schedules/sched.selectors'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { setHasTimeTableAC, updateFailedAC } from '../schedules/sched.actions'
import { dbApi } from '../../api/dbApi'
import { TtAcTypes } from './timetable.d'
import {
  dropLesson,
  getTimeTableACT,
  resolveConflictACT,
  setTimeTableAC,
  TtIsLoadingFalse,
  TtIsLoadingTrue,
} from './tt.actions'
import { showSnack } from '../../components/Notifier'

function* manuallyCreateTimeTable() {
  const timetable: TTInitialStateT = yield select(getTimetableS)
  const id: string = yield select(getChoosenScheduleID)
  const hasTimeTable = yield select(hasTimetableSel)

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

export function* ttSaga() {
  yield takeEvery(TtAcTypes.MANUALLY_CREATE_SCHEDULE, manuallyCreateTimeTable)
  yield takeEvery(TtAcTypes.GET_TIMETABLE, getTimeTable)
  yield takeEvery(TtAcTypes.RESOLVE_CONFLICT, dropLessonAfterResolved)
}
