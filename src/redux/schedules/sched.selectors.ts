import { AppStateType } from '../rootReducer'
import { ScheduleT } from './sched.actions'
import { SchedInitialStateT } from './sched.reducer'

export const getSchedulesS = (state: AppStateType) => state.sched.schedules

export const getIsLoadingS = (state: AppStateType) => state.sched.isLoading

export function getChoosenSchedule(state: AppStateType): ScheduleT {
  return state.sched.schedules.find((e) => e.isChoosen)!
}

export function getChoosenSchedules(state: AppStateType): ScheduleT[] {
  return state.sched.schedules.filter((i) => i.isChoosen)
}

export function getChoosenScheduleID(state: AppStateType): string {
  const choosenSchedule = state.sched.schedules.find((e) => e.isChoosen)
  if (choosenSchedule) return choosenSchedule.id
  return 'no choosen schedule'
}

export function getChoosenSchedID(state: SchedInitialStateT): string {
  const choosenSchedule = state.schedules.find((e) => e.isChoosen)
  if (choosenSchedule) return choosenSchedule.id
  return 'no choosen schedule'
}

export function getChoosenScheduleS(state: SchedInitialStateT): ScheduleT {
  return state.schedules.find((e) => e.isChoosen)!
}
