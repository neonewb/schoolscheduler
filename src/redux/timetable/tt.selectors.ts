import { bSearchClass } from '../../utils/funcs'
import { AppStateType } from '../rootReducer'

export const getTimetableS = (state: AppStateType) => state.timetable

export const getLessonsS = (state: AppStateType) => state.timetable.lessonsTT

export const getClasses = (state: AppStateType) => state.timetable.classesTT

export const getClass = (state: AppStateType, classTitle: string) => {
  const clsIdx = bSearchClass(state.timetable.classesTT, classTitle)
  return state.timetable.classesTT[clsIdx]
}

export const getConflict = (state: AppStateType) => state.timetable.conflict

export const getIsOpenModal = (state: AppStateType) =>
  state.timetable.conflict.isOpenModal

export const getIsLoadingTT = (state: AppStateType) => state.timetable.isLoading