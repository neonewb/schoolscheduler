import { getTimetableS } from './tt.selectors'
import { TTInitialStateT } from './tt.reducer'
import { getChoosenScheduleID } from '../schedules/sched.selectors'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { updateFailedAC } from '../schedules/sched.actions'
import { dbApi } from '../../api/dbApi'

function* setTimeTable() {
  const timetable: TTInitialStateT = yield select(getTimetableS)
  const id: string = yield select(getChoosenScheduleID)

  try {
    yield call(dbApi.updateDoc, id, {
      timetable: timetable,
    })
    console.log(`Schedule timetable successfully updated!`)
  } catch (error) {
    yield put(updateFailedAC(error))
  }
}

export function* ttSaga() {
  yield takeEvery('MANUALLY_CREATE_SCHEDULE', setTimeTable)
}
