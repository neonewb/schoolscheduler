import { bSearchClass } from '../../utils/funcs'
import { AppStateType } from '../rootReducer'

export const getTimetableS = (state: AppStateType) => state.timetable

export const getLessonsS = (state: AppStateType) => state.timetable.lessonsTT

export const getClasses = (state: AppStateType) => state.timetable.classesTT

export const getClassDemo = (state: AppStateType, classTitle: string) => {
  const clsIdx = bSearchClass(state.timetableDemo.classesTT, classTitle)
  return state.timetableDemo.classesTT[clsIdx]
}

export const getClassLessons = (classTitle: string) => (state: AppStateType) =>
  state.timetable.classesTT.find((el) => el.title === classTitle)?.lessons

export const getConflict = (state: AppStateType) => state.timetable.conflict

export const getIsOpenModal = (state: AppStateType) =>
  state.timetable.conflict.isOpenModal

export const getIsLoadingTT = (state: AppStateType) => state.timetable.isLoading