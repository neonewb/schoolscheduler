import { AppStateType } from '../rootReducer'

export const getTimetableS = (state: AppStateType) => state.timetable

export const getLessonsS = (state: AppStateType) => state.timetable.lessonsTT

export const getClasses = (state: AppStateType) => state.timetable.classesTT

export const getClassLessons = (classTitle: string) => (state: AppStateType) =>
  state.timetable.classesTT.find((el) => el.name === classTitle)?.lessons
