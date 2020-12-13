import { ScheduleT } from '../schedules/sched.actions'
import { TtAcTypes } from './timetable.d'

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
