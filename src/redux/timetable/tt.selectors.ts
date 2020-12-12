import { AppStateType } from '../redux.store'

export const getTimetableS = (state: AppStateType) => state.timetable

export const getLessonsS = (state: AppStateType) => state.timetable.lessonsTT
