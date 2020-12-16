import { DaysOfTheWeekT } from '../../utils/daysOfTheWeek'

export enum TtAcTypes {
  MANUALLY_CREATE_SCHEDULE = 'MANUALLY_CREATE_SCHEDULE',
  CLEAR_TIMETABLE = 'CLEAR_TIMETABLE',
  SET_TIMETABLE = 'SET_TIMETABLE',
  GET_TIMETABLE = 'GET_TIMETABLE',
  DROP_LESSON = 'DROP_LESSON',
}

export type LessonT = {
  id: string
  subject: string
  teacher: string
  classTitle: string
  numOfLessons: string
  dayOfTheWeek?: DaysOfTheWeekT
  period?: number
}

export type ClassT = {
  name: string
  lessons: Array<LessonT>
}

export type TeacherT = {
  name: string
  lessons: Array<LessonT>
}
