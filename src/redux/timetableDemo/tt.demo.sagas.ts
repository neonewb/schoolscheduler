import { getConflict } from './tt.demo.selectors'
import { put, select, takeEvery } from 'redux-saga/effects'
import { TtAcTypes } from './timetableDemo.d'
import {
  dropLessonDemo,
  resolveConflictACT,
} from './tt.demo.actions'
import { showSnack } from '../../components/Notifier'

function* dropLessonAfterResolved({ payload }: resolveConflictACT) {
  if (payload.answer) {
    const { lesson, dropResult, source } = yield select(getConflict)
    yield put(dropLessonDemo(lesson, dropResult, source))
  }
}

export function* ttSagaDemo() {
  // yield takeEvery(TtAcTypes.RESOLVE_CONFLICT, dropLessonAfterResolved)
}
