import { schedulesColl } from './../../configs/firebase.config'
import { getTimetableS } from './tt.selectors'
import { TTInitialStateT } from './tt.reducer'
import { getChoosenScheduleID } from '../schedules/sched.selectors'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { updateFailedAC } from '../schedules/sched.actions'

function* setTimeTable() {
  const timetable: TTInitialStateT = yield select(getTimetableS)
  const id: string = yield select(getChoosenScheduleID)
  const docRef = schedulesColl.doc(id)

  try {
    //@ts-ignore
    yield call([docRef, docRef.update], {
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
