import { DropResultT } from '../../utils/DragDropTypes'
import { ScheduleT } from '../schedules/sched.actions'
import { LessonT, TtAcTypes } from './timetable.d'
import { TTInitialStateT } from './tt.reducer'

export type manCreateSchedT = ReturnType<typeof manuallyCreateScheduleAC>
export const manuallyCreateScheduleAC = (schedule: ScheduleT) =>
  ({
    type: TtAcTypes.MANUALLY_CREATE_SCHEDULE,
    payload: {
      schedule,
    },
  } as const)

export const clearTimeTableAC = () =>
  ({
    type: TtAcTypes.CLEAR_TIMETABLE,
  } as const)

export type getTimeTableACT = ReturnType<typeof getTimeTableAC>
export const getTimeTableAC = (id: string) =>
  ({
    type: TtAcTypes.GET_TIMETABLE,
    payload: {
      id,
    },
  } as const)

export const setTimeTableAC = (timetable: TTInitialStateT) =>
  ({
    type: TtAcTypes.SET_TIMETABLE,
    payload: {
      timetable,
    },
  } as const)

export const dropLesson = (lesson: LessonT, dropResult: DropResultT, source: 'footer' | 'timetable') =>
  ({
    type: TtAcTypes.DROP_LESSON,
    payload: {
      lesson,
      dropResult,
      source,
    },
  } as const)

export type resolveConflictACT = ReturnType<typeof resolveConflict>
export const resolveConflict = (answer: boolean) =>
  ({
    type: TtAcTypes.RESOLVE_CONFLICT,
    payload: {
      answer,
    },
  } as const)

export const TtIsLoadingTrue = () =>
  ({
    type: TtAcTypes.SET_TT_IS_LOADING_TRUE,
  } as const)

export const TtIsLoadingFalse = () =>
  ({
    type: TtAcTypes.SET_TT_IS_LOADING_FALSE,
  } as const)