import { DaysOfTheWeekT } from '../../utils/daysOfTheWeek'

export enum TtAcTypes {
  MANUALLY_CREATE_SCHEDULE = 'MANUALLY_CREATE_SCHEDULE',
  CLEAR_TIMETABLE = 'CLEAR_TIMETABLE',
  SET_TIMETABLE = 'SET_TIMETABLE',
  GET_TIMETABLE = 'GET_TIMETABLE',
  DROP_LESSON = 'DROP_LESSON',
  RESOLVE_CONFLICT = 'RESOLVE_CONFLICT',
}

export type LessonT = {
  id: string
  subject: string
  teacher: string
  classTitle: string
  currentLessons?: number
  maxLessons: number
  dayOfTheWeek?: DaysOfTheWeekT
  period?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
}

export type ClassT = {
  title: string
  lessons: Array<LessonT>
}

export type TeacherT = {
  name: string
  lessons: Array<LessonT>
}
