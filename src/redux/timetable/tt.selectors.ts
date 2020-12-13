import { AppStateType } from '../rootReducer'

export const getTimetableS = (state: AppStateType) => state.timetable

export const getLessonsS = (state: AppStateType) => state.timetable.lessonsTT
