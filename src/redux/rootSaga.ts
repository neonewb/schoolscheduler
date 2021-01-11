import { all } from 'redux-saga/effects'
import { schedulesSaga } from './schedules/sched.sagas'
import { authSaga } from './auth/auth.sagas'
import { ttSaga } from './timetable/tt.sagas'
import { ttSagaDemo } from './timetableDemo/tt.demo.sagas'

export default function* rootSaga() {
  yield all([authSaga(), schedulesSaga(), ttSaga(), ttSagaDemo()])
}
