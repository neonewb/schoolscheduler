import { AppStateType } from '../redux.store'
import { ScheduleT } from './firestore.actions'
import { FsdbInitialStateT } from './firestore.reducer'

export const getSchedulesS = (state: AppStateType) => state.fsdb.schedules

export const getIsLoadingS = (state: AppStateType) => state.fsdb.isLoading

export function getChoosenSchedule(state: AppStateType): ScheduleT {
  return state.fsdb.schedules.find((e) => e.isChoosen)!
}

export function getChoosenScheduleS(state: FsdbInitialStateT): ScheduleT {
  return state.schedules.find((e) => e.isChoosen)!
}

export function getChoosenSchedules(state: AppStateType): ScheduleT[] {
  return state.fsdb.schedules.filter((i) => i.isChoosen)
}

export function getChoosenScheduleID(state: AppStateType): string {
  const choosenSchedule = state.fsdb.schedules.find((e) => e.isChoosen)
  if (choosenSchedule) return choosenSchedule.id
  return 'no choosen schedule'
}
